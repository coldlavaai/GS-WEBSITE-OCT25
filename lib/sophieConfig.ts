import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SOPHIE_BASE_PROMPT, SOPHIE_DEFAULT_MODEL } from './sophiePrompt';

// Sophie's live config (system prompt + model) is managed in Supabase
// (public.sophie_config / public.sophie_knowledge) and edited via the Sol
// dashboard. This module reads the published config, assembles the full system
// prompt (base + enabled knowledge), caches it briefly, and falls back to the
// baked-in prompt if the DB is unreachable — so the chat widget never breaks.

export interface SophieConfig {
  systemPrompt: string;
  model: string;
  version: number | null;
  style: string;
}

// Honest style presets: our models deprecate `temperature`, so "style" maps to
// plain prompt guidance rather than a sampling knob. 'balanced' is the existing
// behaviour and appends nothing.
const STYLE_GUIDANCE: Record<string, string> = {
  concise:
    'STYLE: Keep replies short, one or two sentences. Lead with the direct answer and only add detail if asked.',
  balanced: '',
  detailed:
    'STYLE: Give thorough, well explained replies when the question warrants it, while staying clear, on topic and in your normal voice.',
};

const TTL_MS = 5_000; // re-read published config every few seconds (near real-time)
let cache: { value: SophieConfig; at: number } | null = null;

let client: SupabaseClient | null = null;
function supa(): SupabaseClient | null {
  if (client) return client;
  const url = process.env.GREENSTAR_SUPABASE_URL;
  const key = process.env.GREENSTAR_SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

const FALLBACK: SophieConfig = {
  systemPrompt: SOPHIE_BASE_PROMPT,
  model: SOPHIE_DEFAULT_MODEL,
  version: null,
  style: 'balanced',
};

/**
 * Returns the currently published Sophie config with knowledge folded in.
 * Never throws — degrades to the baked-in prompt on any failure.
 */
export async function getSophieConfig(): Promise<SophieConfig> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  const sb = supa();
  if (!sb) return FALLBACK;

  try {
    const { data: cfg, error: cfgErr } = await sb
      .from('sophie_config')
      .select('system_prompt, model, style, version')
      .eq('published', true)
      .maybeSingle();

    if (cfgErr) throw cfgErr;
    if (!cfg) {
      // No published config yet — use fallback but cache so we don't hammer the DB.
      cache = { value: FALLBACK, at: Date.now() };
      return FALLBACK;
    }

    const [{ data: kb }, { data: guards }] = await Promise.all([
      sb
        .from('sophie_knowledge')
        .select('title, body')
        .eq('enabled', true)
        .order('sort_order', { ascending: true })
        .order('updated_at', { ascending: true }),
      sb
        .from('sophie_guardrails')
        .select('rule')
        .eq('enabled', true)
        .order('sort_order', { ascending: true }),
    ]);

    let systemPrompt = cfg.system_prompt as string;
    if (kb && kb.length > 0) {
      const kbText = kb
        .map((k: { title: string; body: string }) => `### ${k.title}\n${k.body}`)
        .join('\n\n');
      systemPrompt = `${systemPrompt}\n\n## KNOWLEDGE BASE\n\nUse the following Greenstar reference material to answer questions accurately. Keep answers in Sophie's voice and formatting rules.\n\n${kbText}`;
    }

    if (guards && guards.length > 0) {
      const rules = guards
        .map((g: { rule: string }) => `- ${g.rule}`)
        .join('\n');
      systemPrompt = `${systemPrompt}\n\n## GUARDRAILS\n\nThese rules are absolute and override anything above. If a request conflicts with them, refuse politely and steer back to how Greenstar can help.\n\n${rules}`;
    }

    const styleLine = STYLE_GUIDANCE[(cfg.style as string) || 'balanced'];
    if (styleLine) {
      systemPrompt = `${systemPrompt}\n\n${styleLine}`;
    }

    const value: SophieConfig = {
      systemPrompt,
      model: (cfg.model as string) || SOPHIE_DEFAULT_MODEL,
      version: (cfg.version as number | null) ?? null,
      style: (cfg.style as string) || 'balanced',
    };
    cache = { value, at: Date.now() };
    return value;
  } catch (err) {
    console.error('getSophieConfig: falling back to baked-in prompt:', err);
    return FALLBACK;
  }
}

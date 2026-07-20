// One-off: seed Sophie config v1 (published) from the baked-in base prompt.
// Idempotent — skips if a published config already exists.
// Run: GREENSTAR_SUPABASE_URL=... GREENSTAR_SUPABASE_SERVICE_KEY=... node scripts/seed-sophie.mjs
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Extract SOPHIE_BASE_PROMPT from the TS source without a TS toolchain:
// it's a single backtick-delimited template literal.
const src = readFileSync(join(__dirname, '..', 'lib', 'sophiePrompt.ts'), 'utf8');
const m = src.match(/SOPHIE_BASE_PROMPT\s*=\s*`([\s\S]*?)`;/);
if (!m) { console.error('Could not find SOPHIE_BASE_PROMPT'); process.exit(1); }
const prompt = m[1];

const url = process.env.GREENSTAR_SUPABASE_URL;
const key = process.env.GREENSTAR_SUPABASE_SERVICE_KEY;
if (!url || !key) { console.error('Missing GREENSTAR_SUPABASE_URL / GREENSTAR_SUPABASE_SERVICE_KEY'); process.exit(1); }

const sb = createClient(url, key, { auth: { persistSession: false } });

const { data: existing } = await sb.from('sophie_config').select('id').eq('published', true).maybeSingle();
if (existing) { console.log('Published config already exists — nothing to seed.'); process.exit(0); }

const { error } = await sb.from('sophie_config').insert({
  version: 1,
  system_prompt: prompt,
  model: 'claude-sonnet-4-6',
  published: true,
  created_by: 'migration',
  note: 'Initial seed from baked-in prompt (VAPI migration).',
});
if (error) { console.error('Seed failed:', error.message); process.exit(1); }
console.log('Seeded Sophie config v1 (published), %d chars.', prompt.length);

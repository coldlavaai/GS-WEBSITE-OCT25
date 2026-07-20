# Sophie Editor in the Sol Dashboard — Build Spec v0.1

**Status:** SPEC (not built). Kickoff: "build the Sophie editor - read .claude/sophie-sol-editor-spec.md"
**Author:** Oliver + Claude, 2026-07-20
**Owner:** JJ to pick up (Greenstar workstream)

---

## 1. Goal

Give Sophie (the Greenstar website chat assistant) a central, viewable, editable, interactive control area inside the **Sol dashboard** — the same "outlay" VAPI gave us, but ours:

- Edit Sophie's **system prompt** and **knowledge base** without touching the repo.
- **Upload documents** (product sheets, warranty PDFs, price guidance) into her knowledge.
- **Test her live** in an embedded chat, seeing exactly how she behaves before it goes to customers.
- Let **Sol** (the Greenstar resident agent) or **Claude Code** update her knowledge programmatically.
- Keep the option to edit via Claude Code at the same time — the DB is the single source of truth, code reads from it.

Sophie already runs off VAPI as of 2026-07-20: direct Anthropic SDK on the Claude Max OAuth token, in `app/api/chat/route.ts` on the GS website. Today her prompt + knowledge are **hardcoded** in that route. This spec moves them into a database the dashboard manages.

## 2. Where things live today (post-VAPI migration)

- **Website chat route:** `app/api/chat/route.ts` (GS-WEBSITE-OCT25) — holds `SOPHIE_SYSTEM_PROMPT` as a const + `add_lead_to_sheet` tool + agentic loop. Model `claude-sonnet-4-6`, auth via `CLAUDE_CODE_OAUTH_TOKEN` + `anthropic-beta: oauth-2025-04-20`.
- **Widget:** `components/VapiTextChat.tsx` (name is legacy; posts to `/api/chat`).
- **Lead capture:** `lib/googleSheets.ts` → `appendLeadToSheet()` → sheet `1uKmU_phI7b6TArPSW7Ks5PV-snggG5KDy5QumIcuRdk`.
- **GS Supabase:** `jnpdwektcdtpvsdrahtf` (shared with the Greenstar calendar project).
- **Sol dashboard:** `greenstar-sol-dashboard.vercel.app` (Sol project). Has an existing DBR tab pattern to copy for a new "Sophie" tab.

## 3. Data model (GS Supabase `jnpdwektcdtpvsdrahtf`)

New schema `sophie`:

```sql
-- Versioned config. The website reads the latest published row.
create table sophie.config (
  id            uuid primary key default gen_random_uuid(),
  version       int  not null,
  system_prompt text not null,
  model         text not null default 'claude-sonnet-4-6',
  published     boolean not null default false,   -- only one published at a time
  created_by    text,                             -- 'oliver' | 'jj' | 'sol' | 'claude-code'
  created_at    timestamptz not null default now(),
  note          text                              -- change summary
);

-- Knowledge base entries, surfaced to Sophie as context (and/or a search tool).
create table sophie.knowledge (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  body        text not null,          -- extracted/plain text
  source_type text not null,          -- 'manual' | 'upload' | 'url'
  source_ref  text,                   -- filename or URL if applicable
  tags        text[] default '{}',
  enabled     boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- Uploaded source files (PDFs etc). Store in Supabase Storage bucket 'sophie-kb';
-- this table is the index. Extraction populates sophie.knowledge.
create table sophie.documents (
  id          uuid primary key default gen_random_uuid(),
  filename    text not null,
  storage_path text not null,
  bytes       int,
  status      text not null default 'uploaded', -- uploaded|extracting|indexed|failed
  uploaded_at timestamptz not null default now()
);
```

RLS: service-role only (dashboard + website read/write via service key). No public access.

## 4. Website changes (GS-WEBSITE-OCT25)

Replace the hardcoded const in `app/api/chat/route.ts` with a DB read:

- New `lib/sophieConfig.ts`: `getSophieConfig()` → fetches the single `published` row from `sophie.config` + all `enabled` rows from `sophie.knowledge`, assembles the system prompt (base prompt + a "KNOWLEDGE BASE" section built from enabled entries). Cache in-memory for ~60s (module-level, revalidated) so we're not hitting Supabase every message.
- Route uses `getSophieConfig()` instead of the const. Model comes from the config row.
- **Fallback:** if Supabase is unreachable, fall back to a baked-in copy of the current prompt (keep the const as `FALLBACK_SYSTEM_PROMPT`) so the widget never hard-fails.
- Env needed on the GS website: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` for `jnpdwektcdtpvsdrahtf` (calendar project already has these — reuse).

Knowledge surfacing — pick one for v0.1:
- **A (simple, ship first):** inline all enabled knowledge entries into the system prompt. Fine while the KB is small (< ~15k tokens).
- **B (later):** expose a `search_knowledge` tool backed by Supabase text search / embeddings, so Sophie retrieves on demand. Do this once the KB outgrows the prompt.

## 5. Sol dashboard changes (Sol project)

New **"Sophie"** tab (mirror the DBR tab structure). Four panes:

1. **Prompt editor** — textarea for `system_prompt`, model dropdown, "Save draft" + "Publish" buttons. Publishing writes a new `sophie.config` row with `published=true` and unpublishes the prior one (transaction). Show version history with the `note` + `created_by` + timestamp; allow rollback (re-publish an old version).
2. **Knowledge base** — CRUD list of `sophie.knowledge` (title, tags, enabled toggle, inline edit). Add-entry form.
3. **Documents** — drag-drop upload → Supabase Storage `sophie-kb` bucket → row in `sophie.documents` → background extraction (PDF→text via `pdf-parse` or similar) → creates `sophie.knowledge` entries with `source_type='upload'`. Show extraction status.
4. **Live test chat** — embedded chat that posts to the **same** `/api/chat` endpoint on the GS website (or a preview of it) using the **draft** config, so you see Sophie's real behaviour before publishing. Needs a `?draft=<configId>` mode on the route, or a dedicated `/api/chat/preview` that loads an unpublished row.

## 6. Sol + Claude Code write access

- **Sol:** give the Sol agent a tool `update_sophie_knowledge(title, body, tags)` that writes to `sophie.knowledge`. Sol can then improve Sophie's KB autonomously (e.g. after learning a new product fact). Gate behind Sol's existing tool-permission model.
- **Claude Code:** no special work — it edits the same Supabase tables (or the fallback const) directly. DB is source of truth.

## 7. Build order

1. Schema + Storage bucket in `jnpdwektcdtpvsdrahtf`.
2. Website: `lib/sophieConfig.ts` + route read-from-DB + fallback + seed the current prompt as v1 published. (Ship this — behaviour identical, now DB-driven.)
3. Dashboard: prompt editor + version history + publish. (Now editable without deploys.)
4. Dashboard: knowledge CRUD + inline-into-prompt (option A).
5. Dashboard: document upload + extraction.
6. Dashboard: live test chat (draft mode).
7. Sol write tool.
8. (Later) Option B retrieval tool when KB grows.

## 8. Open questions for Oliver/JJ

- Confirm reuse of GS Supabase `jnpdwektcdtpvsdrahtf` vs a dedicated Sophie project. (Recommend reuse — same client.)
- Who can publish? (Oliver + JJ; Sol writes knowledge only, not prompt.)
- Knowledge size expectation — does option A hold, or go straight to retrieval (B)?
- Should "publish" auto-redeploy the website, or is the 60s config cache enough? (Cache is enough — no redeploy needed, which is the whole point.)

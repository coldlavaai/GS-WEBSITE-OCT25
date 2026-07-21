# Vercel Environment Variables

> **Superseded (2026-07):** VAPI has been removed entirely. Sophie now runs on
> our own backend via Anthropic's Claude (Max subscription OAuth). The old
> `NEXT_PUBLIC_VAPI_*` variables are no longer used and can be deleted from the
> Vercel project. Any VAPI keys that were ever committed should be treated as
> exposed and revoked in the VAPI dashboard.

## Current chat (Sophie) variables

Set in Vercel → Settings → Environment Variables (Production, Preview, Development):

| Name | Purpose |
|------|---------|
| `CLAUDE_CODE_OAUTH_TOKEN` | Max-subscription setup-token that authenticates Sophie's calls to Claude. Generate with `claude setup-token` (long-lived ~1yr). |
| `GREENSTAR_SUPABASE_URL` | Supabase URL for reading Sophie's published config/knowledge/guardrails. |
| `GREENSTAR_SUPABASE_SERVICE_KEY` | Supabase service-role key (server-side only). |
| `SOPHIE_PREVIEW_SECRET` | Shared secret gating the Sol dashboard's live-test / improve overrides. |
| `RESEND_API_KEY` | Transactional email (leads). |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` | Google Sheets lead capture. |

Sophie's prompt, knowledge, guardrails and model are managed in the Sol
dashboard (Website → Chatbot) and read live from Supabase — no redeploy needed
to change her behaviour.

# Working agreements (all tools, all machines)

These rules bind every AI session in this repo: Claude Code, ChatGPT/Codex,
and anything else, on Oliver's machine and Jacob's alike.

## Every commit says what it serves
End every commit message with a `Serves:` line:
- A client ask, in the client's own words:
  `Serves: Acme, the invoice email going out with last month's total`
- Nothing anybody asked for: `Serves: nothing requested, internal`
- Don't know: `Serves: unknown`. Never invent one.
Several asks in one commit: name them all, separated by `; `.
Body of the message: 1-3 bullets of what changed and why, plain words.
Deploys need no separate note: the deploy carries the commit sha.

## Session continuity
- Before starting work: if `current_state.md` exists at the repo root, read it.
- Stopping mid-work: update `current_state.md` so a session with zero history
  could continue (state, next up, dead ends, anything running). Commit it
  (`Serves: nothing requested, internal`) and push.

## Never overwrite each other
- Pull (rebase) before starting work, every session.
- Never force-push. Never revert or rewrite another person's commit without
  asking them first, by name, and getting a yes.
- If your change conflicts with a commit from the last 48 hours, stop and ask
  the author before resolving it your way.

## Orientation
To see what's happened lately in this repo:
`git log --pretty=format:'%ad %h %an  %s' --date=short -15`

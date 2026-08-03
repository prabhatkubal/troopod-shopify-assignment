## Message to paste into Codex

We've completed Phase 0 (Dawn theme initialized, committed as "Initialize official Dawn theme").

Next is Phase 1: architecture only, no code. Follow `docs/prompts/phase-1-architecture-brief.md`
exactly for scope and required sections of the document. Use `docs/reference/purelane-homepage.html`
as the reference prototype, not a spec — if something in it is wrong for production, flag it and
note the fix in the document rather than carrying it forward.

Full roadmap for context (what comes after Phase 1) is in `milestones.md`, don't build ahead of
Phase 1.

Output only `docs/architecture.md`. If you think part of the brief is wrong or missing something,
say so in the document with your reasoning, don't silently deviate from it.

**Standing instruction for every phase from here on (not just Phase 1):**
Every time you implement or change something (a section, a snippet, a fix to something wrong in
the prototype), append an entry to `docs/build-notes.md` under "What I changed, and why" before
that commit. Each entry: what it was in the prototype, what it is now, one-line reason. Keep it
factual, don't editorialize about quality. I will review and rewrite these before submission, so
prioritize completeness over polish, don't skip an entry because it seems minor. Do not remove
or rewrite the template comments in build-notes.md yourself, leave that to me.

# START HERE

Execution entrypoint for release workflow and progress tracking.

Last Updated: 2026-04-26

## Read In Order

1. `docs/runbooks/git/git-strategy.md`
2. `docs/runbooks/git/daily-git-commands.md`
3. `docs/runbooks/issues/github-issues.md`
4. `docs/runbooks/status/project-status.md`

## Daily Flow

1. Pull latest changes from `main`.
2. Select one issue from the weekly plan.
3. Create one branch, make focused commits, open one PR.
4. Run quality gates (lint, tests, build).
5. Merge after approval and update progress in `project-status.md`.

## Weekly Rhythm

- Week 1: Backend foundation
- Week 2: Service expansion and frontend baseline
- Week 3: Commerce flows
- Week 4: Admin, POS, mobile
- Week 5: Test hardening
- Week 6: Infra and release stabilization

## Required References

- Strategy: `docs/runbooks/git/git-strategy.md`
- Command cookbook: `docs/runbooks/git/daily-git-commands.md`
- Issue list: `docs/runbooks/issues/github-issues.md`
- Progress tracker: `docs/runbooks/status/project-status.md`
- Setup: `docs/development/setup.md`
- Global docs index: `docs/README.md`

## Definition Of Done (Per PR)

- Scope matches one issue
- Lint passes
- Tests pass
- No broken imports
- Docs updated if behavior changed
- Status checklist updated

## Quick Commands

```bash
git checkout main
git pull origin main
git checkout -b feat/<short-name>

# ... implement ...

git add .
git commit -m "feat: <summary>"
git push origin feat/<short-name>
```

## Escalation

If blocked for more than 30 minutes:

1. Capture error and reproduction steps.
2. Check `docs/runbooks/fixes/errors-fix.md`.
3. Open or update issue with blocker details.

## Scope Rule

Use this file as an entrypoint only. Keep long-form details in the linked runbooks.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A minimal static site (`index.html`) used as a training ground for learning CI/CD concepts on GitHub Actions incrementally — not a real product. Changes here are typically exercises (add a pipeline step, add branch protection, fix a failing check) rather than feature work.

There is no `package.json`; tooling is invoked ad hoc via `npx --yes`.

## Commands

Run the same checks the CI runs, from the repo root:

```
npx --yes prettier --check "**/*.{html,css,js,md}"   # format check
npx --yes prettier --write "**/*.{html,css,js,md}"   # auto-fix formatting
npx --yes htmlhint "**/*.html"                        # HTML lint
```

## CI/CD

- Workflow: `.github/workflows/ci.yml`, triggered on push/PR to `master`.
- `build` job: currently a placeholder (`echo` only) — real build/test/deploy steps get added here incrementally as a training exercise.
- `lint` job: Prettier format check + HTMLHint, both run via `npx --yes` (no local `node_modules`).
- `master` is protected via a GitHub ruleset (PR required, `lint` required status check, force-push/delete blocked). Direct pushes to `master` will be rejected — work must go through a branch + PR.
- Prettier is strict about trailing newlines; a missing final newline on any matched file (including `.md`) fails the `lint` job.

## Sensitive local directory

`nsubir/` (and `*.nsubir`) is gitignored and holds local secrets (SSH keys, credentials) — never remove it from `.gitignore` and never stage/commit files from it.

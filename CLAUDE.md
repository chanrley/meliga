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
node --test                                           # run tests (native Node test runner)
```

Test files are plain ESM (`import`/`export`), matched by Node's default `**/*.test.js` pattern — no test framework or config needed. To run a single file: `node --test validarCpf.test.js`.

## CI/CD

- Workflow: `.github/workflows/ci.yml`, triggered on push/PR to `master`.
- Jobs run in sequence via `needs`: `lint` → `test` → `build`. Each step of this chain was added incrementally as a training exercise (see `obs.md`) — do not collapse them back into a single job.
- `lint` job: Prettier format check + HTMLHint, both run via `npx --yes` (no local `node_modules`).
- `test` job: `node --test` (Node's built-in test runner, no dependencies).
- `build` job: packages `index.html` into `dist/` and uploads it via `actions/upload-artifact` — real deploy steps get added here incrementally.
- `master` is protected via a GitHub ruleset (PR required, `lint` required status check, force-push/delete blocked). Direct pushes to `master` will be rejected — work must go through a branch + PR.
- Prettier is strict about trailing newlines; a missing final newline on any matched file (including `.md`) fails the `lint` job.

## Progress tracker

`obs.md` lists the suggested CI/CD progression (essential → advanced) for this training repo, split into `OK` (done) and `NOK` (not yet done) sections. When completing an item from the `NOK` list, move it into `OK` in the same commit.

## Sensitive local directory

`nsubir/` (and `*.nsubir`) is gitignored and holds local secrets (SSH keys, credentials) — never remove it from `.gitignore` and never stage/commit files from it.

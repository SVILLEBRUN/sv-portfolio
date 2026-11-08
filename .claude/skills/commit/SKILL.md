---
name: commit
description: Creates commits for the sv-portfolio repo following its conventions, i.e. Conventional Commits messages `type(area): summary` in English, one logical change per commit, with no secrets or generated files, and never a push (pushing to master deploys to production). Use whenever the user wants to commit ("commit", "commit this", "fais les commits", "commit ce que j'ai changé"), split changes into commits or write a commit message, even if they don't mention the conventions. Never commit without being asked.
---

# Commits for sv-portfolio

sv-portfolio is a single Nuxt app (one-page portfolio, content in `content/{fr,en,es}/`, one server route for the contact form). There is no frontend/backend split, so messages carry no `[Scope]` prefix: the optional `(area)` tells which part of the site moved. The history already follows `type: summary`; keep it consistent.

Commits are made only when the user asks for them (this skill being invoked counts as asking). Split, commit, then summarize. Commit messages are in English; the summary you give the user is in French.

## 1. Inspect

```bash
git status --short
git diff
git diff --staged
```

Also read the content of untracked files (`??`). What the user already staged is input, not necessarily a commit as-is: if the split requires it, rebuild the index (`git reset -q`) and say so in your summary.

## 2. Keep out of commits

- **Secrets**: `.env` and any `.env.*` other than `.env.example`, Gmail app passwords, Docker Hub credentials, tokens. Open suspicious files: a harmless name can hide a key. `.env.example` must only hold placeholder values.
- **Generated files**: `.nuxt/`, `.output/`, `.nitro/`, `.cache/`, `.data/` (Nuxt Content's local SQLite database), `dist/`, `node_modules/`.
- **Local or OS files**: `.DS_Store`, `.vscode/`, `.idea/`, `.claude/settings.local.json`.

Leave them out and tell the user, suggesting a `.gitignore` entry when it applies. A committed secret stays in history even after deletion, so take no risk.

The public contact details in `content/` (email, city, social links) are meant to be published: they are not secrets.

## 3. Split

1. **One commit = one logical change.** Keep commits small: an unrelated fix and refactor go in separate commits.
2. **Keep together what only works together:**
   - a text change and its translations in `content/fr`, `content/en` and `content/es`;
   - a schema change in `content.config.ts` and the content files that follow it (otherwise the build breaks at that commit);
   - `package.json` and `pnpm-lock.yaml`;
   - an image in `app/assets/images/` and the content entry that references it.
3. Docs (`README.md`, `CLAUDE.md`), CI and Docker changes go in their own commits unless they directly document or support the change being committed.
4. If one file holds two distinct changes, keep it in a single commit and flag it: `git add -p` is interactive and unavailable here.

## 4. Write the message

```
<type>(<optional area>): <summary>

<optional body: what and why, lines of 72 characters max>
```

- **type** (Conventional Commits):
  - `feat`: new feature or new visible content section
  - `fix`: bug fix, wrong text or broken link
  - `refactor`: restructuring without behaviour change
  - `perf`: performance
  - `test`: tests
  - `docs`: documentation (`README.md`, `CLAUDE.md`, code comments)
  - `style`: visual or CSS-only tweaks, formatting
  - `chore`: maintenance (cleanup, configuration, `.claude/` skills)
  - `build`: build, `Dockerfile`, `docker-compose*.yml`, dependencies
  - `ci`: GitHub Actions workflow
  - `revert`: undo a commit
- **area** (optional): the part touched, e.g. `content`, `i18n`, `seo`, `contact`, `hero`, `about`, `projects`, `header`, `footer`, `theme`, `animations`, `docker`, `deps`.
- **summary**: English, imperative ("add", not "added"), lowercase, no trailing period, about 72 characters max.
- **body**: only when the why isn't obvious from the summary.
- **breaking change**: put `!` right before the colon, **after** the area (`feat(i18n)!:`, never `feat!(i18n):`), and add a footer `BREAKING CHANGE: <what breaks>`. Here a change is breaking when it breaks the deployment or a public contract: a renamed environment variable (`NUXT_MAIL_*`), a changed container port, a changed public URL or locale prefix, a changed `/api/contact` request body.

Examples:

```
feat(projects): add academint project card
fix(contact): keep the draft when the mail server is unreachable
fix(content): correct spanish typo in about section
style(hero): reduce title size on mobile
build(deps): bump nuxt to 4.5.2
ci: build the docker image only on master
docs: add CLAUDE.md and .env.example
refactor(contact)!: rename NUXT_MAIL_TARGET to NUXT_MAIL_TO
```

## 5. Commit

Commit on the current branch. For each commit, in order:

```bash
git add <specific files>        # never `git add -A` nor `git add .`, which would pull in the files you set aside
git diff --staged --stat        # check the index holds exactly this commit, no more, no less
git commit -F - <<'EOF'
<message>
EOF
```

If the environment asks for trailer lines at the end of the message (for example `Co-Authored-By:`), add them to every commit.

**Never push** unless explicitly asked: a push to `master` triggers the self-hosted workflow that builds and publishes the production image. Do not force-push, open a PR or rewrite history (amend, rebase, reset of commits) unless explicitly asked. Leave older commits that predate these conventions as they are.

## 6. Summarize

End with `git log --oneline -n <N>` and `git status --short`. Then summarize in French: the commits created (hash and message), the files left out and why, and what remains uncommitted. Remind the user that nothing was pushed.

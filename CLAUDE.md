# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

Personal portfolio of Sébastien Villebrun, live at https://sebastien-villebrun.com. Hand-built to experiment with technologies (Nuxt 4, Nuxt UI v4, Nuxt Content v3, Tailwind v4, @vueuse/motion) while staying fully functional, contact form included. The design is deliberately personal: follow the existing style rather than "normalizing" it.

## Language conventions

- **Conversations with the user are in French.**
- **All code is written in English**: identifiers, comments, commit messages, log and error messages, docs.
- The only exception is user-facing text, which is localized in French, English and Spanish. It lives in `content/{fr,en,es}/`, not in components.
- Text only the user reads stays in French, e.g. the `De : ` line appended to contact emails in `ContactForm.vue`.

## Git

**Never commit (or push) without asking the user first**, even when a task is finished. Pushing to `master` deploys to production (see Deployment). When asked to commit, use the `commit` skill (`.claude/skills/commit/`), which holds the message format and splitting rules.

## Commands

Package manager: **pnpm**. Native builds for `better-sqlite3`, `esbuild` and `vue-demi` are allowed in `pnpm-workspace.yaml`; if pnpm blocks a native build, run `pnpm approve-builds`.

```bash
pnpm install          # also runs `nuxt prepare` (postinstall)
pnpm dev              # http://localhost:3000
pnpm build            # Nitro build into .output/
pnpm preview          # preview the production build
pnpm generate         # static build (not used in production)

docker compose up                                    # containerized dev with HMR, port 8081 (HMR on 24678)
docker compose -f docker-compose.prod.yml up --build # local production image, port 8081, reads .env
```

No tests, linter or typecheck are configured in this project.

## Environment variables

Copy `.env.example` to `.env` (ignored by git and Docker): `NUXT_MAIL_USER`, `NUXT_MAIL_PASS` (Gmail app password), `NUXT_MAIL_TARGET` (recipient). Exposed server-side as `runtimeConfig.mailUser/mailPass/mailTarget` in [nuxt.config.ts](nuxt.config.ts). Without them, `/api/contact` returns 500.

## Architecture

**Single-page** site (`app/pages/index.vue`) where **all text comes from Nuxt Content**; there are no i18n message files.

- **Multilingual content**: each of `content/{fr,en,es}/` holds `index.yml`, `header.yml`, `footer.yml`, `seo.yml` and `about_me.md`. Each file type is a collection typed by a zod schema in [content.config.ts](content.config.ts). Fields are `nonempty()`, so a missing field breaks the build or the query. Adding or changing a field means updating the schema **and** all three locales.
- **Content queries**: each component uses `useAsyncData` + `queryCollection(...).path(...)` with `watch: [locale]`, and falls back to the default locale (`fr`) when a translation is missing. Paths are `/${locale}` for `index.yml` and `/${locale}/<name>` for the others (e.g. `/${locale}/seo`). Reuse this pattern for any new collection.
- **Shared types**: `content.config.ts` also exports schemas/types (`ProjectItem`, `ContactForm`) that components import via `@@/content.config`.
- **HTML in content**: some fields (`hero.title`, `contact.title`) contain HTML (e.g. `<span class="text-gradient">`) rendered with `v-html`.
- **i18n**: `@nuxtjs/i18n` with the `prefix_and_default` strategy. Default is `fr` (no prefix), plus `/en` and `/es`. The `hreflang`/canonical links are hardcoded in [app/app.vue](app/app.vue) and must be updated if a locale is added.
- **SEO**: `@nuxtjs/seo`. Meta, Open Graph and Schema.org (`definePerson`) tags are filled in `app/app.vue` from the `seo` collection.
- **Images**: `@nuxt/image` with `image.dir = 'assets/images'`. Paths in content (`/frontend.png`, `/tools_logo/vue_js.png`, `/projects/...`) are relative to `app/assets/images/`, not `public/`.
- **Components**: auto-imported with `pathPrefix: false`, so they are referenced by file name only (`<ContactForm>`, not `<UiContactForm>`), whatever their subfolder (`layout/`, `ui/`).
- **Theme**: Nuxt UI colors (`primary: indigo`, `secondary: purple`) and header/footer slots live in [app/app.config.ts](app/app.config.ts). Font, weights and letter spacing are redefined in the `@theme` block of [app/assets/css/main.css](app/assets/css/main.css); the Tailwind font weights are shifted from their defaults. The `v-motion-slide-up` animation directive is declared in `runtimeConfig.public.motion`.
- **Anti-bot**: the email address and social links are deliberately wrapped in `<ClientOnly>` so they don't appear in server-rendered HTML. Keep it that way.

### Contact form

`ContactForm.vue` (zod validation, error messages taken from content) → `useMail()` composable → `POST /api/contact` ([server/api/contact.post.ts](server/api/contact.post.ts)) → Nodemailer with the `gmail` service. The expected body is `{ from, replyTo, subject, text }`. The form saves a draft in `localStorage` (`contact_form_draft`): name and email after a successful send, the full message after a failure, and offers to restore it on the next visit. The server only logs a hash of the sender's email.

`better-sqlite3` is only used as Nuxt Content's local database (`.data/`).

## Deployment

A push to `master` triggers [.github/workflows/docker-image.yml](.github/workflows/docker-image.yml) on a **self-hosted** runner. It builds the Dockerfile's `production-stage` target for `linux/arm64` and pushes it to Docker Hub as `sebvillebrun/sv-portfolio:latest`. The final image only contains `.output/` and runs `node server/index.mjs` on port 8081. The mail variables must be passed to the container (`env_file: .env` in `docker-compose.prod.yml`). **Pushing to `master` means publishing to production.**

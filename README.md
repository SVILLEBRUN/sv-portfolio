# 🚀 Developer Portfolio

A modern, responsive, and performant developer portfolio designed to showcase my technical skills, professional experience, and personal projects.

Live at **[sebastien-villebrun.com](https://sebastien-villebrun.com)**.

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![VueUse Motion](https://img.shields.io/badge/VueUse_Motion-41B883?style=for-the-badge&logo=vuedotjs&logoColor=white)

---

## ✨ Features

- **⚡ Blazing Fast Performance:** Powered by Nuxt 4 with Server-Side Rendering (SSR) on a Nitro server.
- **📱 Fully Responsive:** Clean and adaptive UI across all device sizes (Mobile, Tablet, Desktop) using Nuxt UI and Tailwind CSS v4.
- **🌐 Multi-language Support (i18n):** Native internationalization support powered by `@nuxtjs/i18n` (French, English and Spanish).
- **🎨 Smooth Animations:** Interactive UI micro-interactions driven by `@vueuse/motion` and Lottie.
- **📩 Integrated Contact Form:** Direct email delivery through a Nitro server route (`/api/contact`) powered by [Nodemailer](https://nodemailer.com/) (Gmail SMTP).
- **🐳 Docker Ready:** Fully containerized setup with optimized builds for both Development and Production.
- **🛡️ Type Safe:** Written in TypeScript, with every piece of content validated by zod schemas.

---

## 🛠️ Tech Stack

- **Framework:** [Nuxt.js 4](https://nuxt.com/) (Vue 3)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [Nuxt UI](https://ui.nuxt.com/)
- **Content:** [Nuxt Content v3](https://content.nuxt.com/) (local [SQLite](https://sqlite.org/) database via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3))
- **Email:** [Nodemailer](https://nodemailer.com/)
- **Animations:** [@vueuse/motion](https://motion.vueuse.org/) & [dotLottie](https://lottiefiles.com/)
- **Internationalization:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **SEO:** [Nuxt SEO](https://nuxtseo.com/) (meta tags, Open Graph, Schema.org)
- **Icons:** [Iconify](https://iconify.design/) (`lucide`, `tabler`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended; the Docker images use Node 26)
- [pnpm](https://pnpm.io/) (v10+ recommended; the Docker images use pnpm 12)
- [Docker](https://www.docker.com/) & Docker Compose (Optional, for containerized development)

Enable `pnpm` via Corepack if not already installed:

```bash
corepack enable
```

---

### 1. Installation

Clone the repository and install dependencies using `pnpm`:

```bash
git clone https://github.com/SVILLEBRUN/sv-portfolio.git
cd sv-portfolio
pnpm install
```

> **Note:** If pnpm blocks a native build (e.g. `better-sqlite3`), run:
> ```bash
> pnpm approve-builds
> ```

---

### 2. Environment Variables

The contact form needs a Gmail account to send messages. Create a `.env` file in the root directory from the provided template:

```bash
cp .env.example .env
```

Then fill in the variables below:

```bash
NUXT_MAIL_TARGET=target@example.com
NUXT_MAIL_USER=sender@gmail.com
NUXT_MAIL_PASS=your-app-password
```

| Variable | Description |
| --- | --- |
| `NUXT_MAIL_TARGET` | Destination email address where contact form messages will be sent. |
| `NUXT_MAIL_USER` | Gmail account used by the server to send the messages. |
| `NUXT_MAIL_PASS` | [App password](https://myaccount.google.com/apppasswords) of that Gmail account (not its regular password). |

Without these variables the site still runs, but `/api/contact` returns a 500 error.

---

### 3. 💻 Development Server

#### Local Machine

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

#### With Docker (Hot Reloading)

To run the development environment in a Docker container with live reloading, on `http://localhost:8081`:

```bash
docker compose up
```

---

### 4. ✏️ Editing Content

All the text on the site comes from [Nuxt Content](https://content.nuxt.com/) files, one folder per language:

```
content/
├── fr/   # default language, served without prefix
├── en/   # served under /en
└── es/   # served under /es
```

Each folder holds the same files (`index.yml`, `header.yml`, `footer.yml`, `seo.yml`, `about_me.md`). Their structure is defined by the zod schemas in [`content.config.ts`](content.config.ts) and every field is required, so when you add or rename a field, update the schema **and** all three languages.

Image paths in the content (e.g. `/projects/...`) are relative to `app/assets/images/`, not `public/`.

---

### 5. 📦 Production & Deployment

#### Local Build

Build the application for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

#### Docker Production Build

Build and run the production container on `http://localhost:8081` (it reads the mail variables from `.env`):

```bash
docker compose -f docker-compose.prod.yml up --build
```

#### Deployment

Every push to `master` deploys to production. The [GitHub Actions workflow](.github/workflows/docker-image.yml) runs on a self-hosted runner: it builds the `production-stage` target of the Dockerfile for `linux/arm64` and pushes it to Docker Hub as `sebvillebrun/sv-portfolio:latest`.

The image only contains the Nitro output and listens on port `8081`. The mail variables must be passed to the container at runtime.

---

### 6. 📄 License

This project is released under the [MIT License](LICENSE).

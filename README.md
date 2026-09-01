# 🚀 Developer Portfolio

A modern, responsive, and performant developer portfolio designed to showcase my technical skills, professional experience, and personal projects.

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## ✨ Features

- **⚡ Blazing Fast Performance:** Powered by Nuxt 4, and Server-Side Rendering (SSR) / Static Site Generation (SSG).
- **📱 Fully Responsive:** Clean and adaptive UI across all device sizes (Mobile, Tablet, Desktop) using Nuxt UI and Tailwind CSS v4.
- **🌐 Multi-language Support (i18n):** Native internationalization support powered by `@nuxtjs/i18n` (English, French and Spanish)
- **🎨 Smooth Animations:** Interactive UI micro-interactions driven by `@vueuse/motion`.
- **📩 Integrated Contact Form:** Direct email delivery powered by `nuxt-mail`.
- **🐳 Docker Ready:** Fully containerized setup with optimized builds for both Development and Production.
- **🛡️ Type Safe:** Fully typed with TypeScript for robust and maintainable code.

---

## 🛠️ Tech Stack

- **Framework:** [Nuxt.js 4](https://nuxt.com/) (Vue 3)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [Nuxt UI](https://ui.nuxt.com/)
- **Database:** [SQLite](https://sqlite.org/) via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Animations:** [@vueuse/motion](https://motion.vueuse.org/)
- **Internationalization:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Icons:** [Iconify](https://iconify.design/) (`lucide`, `tabler`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (v10+ recommended)
- [Docker](https://www.docker.com/) & Docker Compose (Optional, for containerized development)

Enable `pnpm` via Corepack if not already installed:

```bash
corepack enable
```

---

### 1. Installation

Clone the repository and install dependencies using `pnpm`:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
pnpm install
```

> **Note:** If prompted during installation or build regarding C/C++ native builds (e.g. `better-sqlite3`), run:
> ```bash
> pnpm approve-builds
> ```

---

### 2. Environment Variables

Create a `.env` file in the root directory based on the variables below:

```bash
MAIL_TARGET=target@example.com
MAIL_USER=sender@example.com
MAIL_PASS=your-app-password
```

| Variable | Description |
| --- | --- |
| `NUXT_MAIL_MESSAGE_TO` | Destination email address where contact form messages will be sent. |
| `NUXT_MAIL_SMTP_AUTH_USER` | Email address/account used by the server to send the message. |
| `NUXT_MAIL_SMTP_AUTH_PASS` | Password or App Password for the sending email account. |

---

### 3. 💻 Development Server

#### Local Machine

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

#### With Docker (Hot Reloading)

To run the development environment in a Docker container with live reloading:

```bash
docker compose up
```

---

### 4. 📦 Production & Deployment

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

Build and run the production container:

```bash
docker build -t sv-portfolio .
docker run -p 80:80 sv-portfolio
```

---

### 5. 📄 License

This project is released under the [MIT License](https://github.com/SVILLEBRUN/sv-portfolio/blob/master/LICENSE).
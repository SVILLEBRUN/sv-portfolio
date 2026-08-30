# 🚀 Developer Portfolio

A modern, responsive, and performant developer portfolio designed to showcase my technical skills, professional experience, and personal projects.

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## ✨ Features

- **⚡ Blazing Fast Performance:** Powered by Nuxt 3 and Server-Side Rendering (SSR) / Static Site Generation (SSG).
- **📱 Fully Responsive:** Clean and adaptive UI across all device sizes (Mobile, Tablet, Desktop).
- **🌐 Multi-language Support (i18n):** Native internationalization support for English, French, and Spanish.
- **🎨 Smooth Animations:** Interactive UI micro-interactions driven by Framer Motion / Motion One.
- **📩 Integrated Contact Form:** Direct email delivery powered by backend environment variables.
- **🛡️ Type Safe:** Fully typed with TypeScript for robust and maintainable code.

---

## 🛠️ Tech Stack

- **Framework:** [Nuxt.js](https://nuxt.com/) (Vue 3)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Internationalization:** [@nuxtjs/i18n](https://i18n.nuxtjs.org/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory based on the variables below:

```bash
MAIL_TARGET=target@example.com
MAIL_USER=sender@example.com
MAIL_PASS=your-app-password
```

| Variable | Description |
| --- | --- |
| `MAIL_TARGET` | Destination email address where contact form messages will be sent. |
| `MAIL_USER` | Email address/account used by the server to send the message. |
| `MAIL_PASS` | Password or App Password for the sending email account. |


### 3. 💻 Development Server

Start the development server on http://localhost:3000 :

```bash
npm run dev
```

> **Note for macOS users:** *If you encounter an `EINVAL` error when launching the dev server, run:*
>
> ```bash
> TMPDIR=/tmp npm run dev
> ```

### 4. 📦 Production & Deployment

Build the application for production :

```bash
npm run build
```

Locally preview the production build:

```bash
npm run preview
```

### 5. 📄 License

This project is released under the [MIT License](https://github.com/SVILLEBRUN/sv-portfolio/blob/main/LICENSE).

---
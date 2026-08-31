# Stage 1: Base (Installation des dépendances avec pnpm)
FROM node:22-alpine AS base
RUN apk update && apk upgrade --no-cache
WORKDIR /app

ENV CI=true

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml *.npmrc ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Stage 2: Development (Environnement de dev local)
FROM base AS development-stage
COPY . .
EXPOSE 8081
EXPOSE 24678
CMD ["pnpm", "run", "dev"]

# Stage 3: Build (Compilation Nuxt / Nitro)
FROM base AS build
COPY . .
RUN pnpm run build

# Stage 4: Production (Image finale autonome et ultra légère)
FROM node:22-alpine AS production-stage
RUN apk update && apk upgrade --no-cache
WORKDIR /app

COPY --from=build /app/.output ./

ENV NODE_ENV=production
ENV PORT=8081
ENV HOST=0.0.0.0

EXPOSE 8081

CMD ["node", "server/index.mjs"]
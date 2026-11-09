# syntax = docker/dockerfile:1

# Stage 1: Build (Nuxt / Nitro compilation), from the prebuilt dependencies image
FROM sebvillebrun/sv-portfolio-dependencies:latest AS build

# Fail fast if the dependencies image was built from other manifests than this
# commit's (e.g. its CI build failed), instead of shipping stale node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /tmp/manifests/
RUN for f in package.json pnpm-lock.yaml pnpm-workspace.yaml; do \
      cmp -s "/tmp/manifests/$f" "/app/$f" \
        || { echo "$f differs from the dependencies image: rebuild it with Dockerfile.dependencies" >&2; exit 1; }; \
    done

COPY . .
RUN pnpm run build

# Stage 2: Production (standalone, lightweight final image)
FROM node:26-alpine AS production-stage
RUN apk update && apk upgrade --no-cache
WORKDIR /app

COPY --from=build /app/.output ./

ENV NODE_ENV=production
ENV PORT=8081
ENV HOST=0.0.0.0

EXPOSE 8081

CMD ["node", "server/index.mjs"]

# syntax = docker/dockerfile:1

# Local development image (docker-compose.yml). Standalone: it installs the
# dependencies from the local lockfile instead of pulling the Docker Hub image.
FROM node:26-alpine
RUN apk update && apk upgrade --no-cache
WORKDIR /app

ENV CI=true

RUN npm install -g pnpm@12

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml *.npmrc ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    apk add --no-cache python3 make g++ \
    && pnpm install --frozen-lockfile

COPY . .

EXPOSE 8081
EXPOSE 24678
CMD ["pnpm", "run", "dev"]

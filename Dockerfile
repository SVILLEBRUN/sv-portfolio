# Stage 1: Base (Installation des dépendances)
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# Stage 2: Development (Pour le développement local)
FROM base AS development
COPY . ./
# On expose souvent le port 3000 ou 5173 en dev selon le framework
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 3: Build (Préparation de la prod)
FROM base AS build
COPY . ./
RUN npm run build

# Stage 4: Production (Image finale légère)
FROM node:22-alpine AS production
WORKDIR /app
COPY --from=build /app/.output/ ./

ENV PORT=80
ENV HOST=0.0.0.0
EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
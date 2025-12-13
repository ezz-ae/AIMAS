# Cloud Run Dockerfile for apps/api
# Build context should be repo root.

FROM node:20-alpine AS deps
WORKDIR /repo
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
RUN pnpm -w install --frozen-lockfile

FROM node:20-alpine AS build
WORKDIR /repo
RUN corepack enable
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN pnpm -C apps/api build

FROM node:20-alpine AS run
WORKDIR /repo
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S node -G nodejs
COPY --from=build /repo/apps/api/dist ./apps/api/dist
COPY --from=build /repo/apps/api/package.json ./apps/api/package.json
COPY --from=build /repo/apps/api/node_modules ./apps/api/node_modules
USER node
ENV PORT=8080
EXPOSE 8080
CMD ["node", "apps/api/dist/server.js"]

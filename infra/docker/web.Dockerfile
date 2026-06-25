# Stage 1: Prune monorepo workspace
FROM node:22-alpine AS pruner
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune web --docker

# Stage 2: Build the isolated application
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN pnpm --filter web build

# Stage 3: Minimal production runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Leverage Next.js standalone output to keep the image small
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000

# Next.js standalone server path
CMD ["node", "apps/web/server.js"]
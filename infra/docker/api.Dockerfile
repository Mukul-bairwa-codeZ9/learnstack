# Stage 1: Prune monorepo workspace
FROM node:22-alpine AS pruner
WORKDIR /app
RUN npm i -g turbo
COPY . .
# Slices the monorepo to isolate 'api' and its workspace dependencies
RUN turbo prune api --docker

# Stage 2: Build the isolated application
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

# Copy lockfile and pruned package configs
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies for building
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY --from=pruner /app/out/full/ .
RUN pnpm --filter api build

# Stage 3: Minimal production runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create a secure, non-root user
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

RUN corepack enable

# Copy pruned workspace metadata and package configs
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install ONLY production dependencies directly into the runner environment
RUN pnpm install --prod --frozen-lockfile --filter api

# Copy compiled build artifact from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist

USER nestjs
EXPOSE 4000

# Execute directly from the isolated application directory
CMD ["node", "apps/api/dist/main.js"]
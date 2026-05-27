# Developer Documentation Platform

Production-grade developer documentation and learning platform inspired by Notion, Hashnode, and GitBook.

---

# Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- HeroUI
- Redux Toolkit
- Framer Motion

## Backend
- NestJS
- MongoDB
- Redis

## DevOps
- Docker
- GitHub Actions
- Turborepo
- PNPM Workspaces

---

# Architecture

```txt
apps/
  web/        -> Next.js frontend
  api/        -> NestJS backend

packages/
  ui/         -> shared UI components
  types/      -> shared TS types
  constants/  -> shared constants
  config/     -> shared configurations
```

---

# Setup

## Install Dependencies

```bash
pnpm install
```

---

# Run Docker Services

```bash
docker compose up -d
```

Services:
- MongoDB
- Redis

---

# Run Applications

## Frontend

```bash
pnpm --filter web dev
```

## Backend

```bash
pnpm --filter api start:dev
```

---

# Build

```bash
pnpm build
```

---

# Lint

```bash
pnpm lint
```

---

# Git Workflow

```txt
feature/* → develop → main
```

Rules:
- PR required before merge
- CI checks required
- squash merge preferred

---

# Versioning

Semantic Versioning:

```txt
MAJOR.MINOR.PATCH
```

Example:

```txt
v1.0.0
```

---

# Current Phase

## Phase 1
Infrastructure + Authentication Foundation# learnstack

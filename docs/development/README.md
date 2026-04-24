# Development Documentation

> Coding standards, local setup, testing, and best practices

---

## 📋 Contents

1. [setup.md](./setup.md) - Local environment setup
2. [coding-standards.md](./coding-standards.md) - Code style & conventions
3. [git-workflow.md](./git-workflow.md) - Git branching & commits
4. [testing.md](./testing.md) - Testing guidelines
5. [debugging.md](./debugging.md) - Debugging techniques
6. [performance.md](./performance.md) - Performance optimization
7. [security-best-practices.md](./security-best-practices.md) - Security tips
8. [tools.md](./tools.md) - Recommended tools

---

## Quick Start

### 1. Setup Local Environment
```bash
# See setup.md
yarn install
docker-compose up -d
```

### 2. Choose Your Task
- **New Feature**: See [guides/adding-new-endpoint.md](../guides/adding-new-endpoint.md)
- **Bug Fix**: See [debugging.md](./debugging.md)
- **Refactoring**: See [coding-standards.md](./coding-standards.md)

### 3. Before Committing
- Run tests: `yarn test`
- Check linting: `yarn lint`
- See [git-workflow.md](./git-workflow.md)

---

## Development Commands

```bash
# Install dependencies
yarn install

# Start development servers
yarn dev

# Run tests
yarn test

# Run linter
yarn lint

# Format code
yarn format

# Build for production
yarn build
```

---

## Tech Stack

- **Backend**: Node.js + NestJS + TypeScript
- **Frontend**: Next.js + TypeScript + TailwindCSS
- **Mobile**: Flutter + Dart
- **Database**: PostgreSQL + Prisma
- **Cache**: Redis

---

**Last Updated**: 2026-04-25

# 🏗️ Monorepo Refactor Plan - Multi-Channel Commerce System

**Status:** In Progress  
**Version:** 1.0  
**Last Updated:** 2026-04-26

---

## 📊 Executive Summary

Dự án hiện tại đã có foundation tốt (modules structure cho services) nhưng cần refactor để:
- Tăng tính nhất quán (consistency)
- Dễ scale khi thêm services/apps mới
- Tách biệt rõ `shared code` thành `packages`
- Hệ thống hóa `database` layer
- Naming convention rõ ràng và enforce via linting

---

## 📁 Current vs Proposed Structure

### ❌ CURRENT (với vấn đề)

```
root/
├── apps/                           ✅ OK
│   ├── web/warehouse-dashboard
│   └── mobile/delivery-mobile-app
├── services/                       ✅ OK (đã refactor)
│   ├── auth-service/src/modules/...
│   └── order-service/src/modules/...
├── shared/                         ⚠️ Tên cũ - chỉ có types
│   └── types/
├── prisma/                         ❌ ROOT - shared cho cả 2 services
├── docs/                           ✅ OK
├── infrastructure/                 ✅ OK
├── scripts/                        ⚠️ Quá ít
├── prompts/                        ❌ Không rõ mục đích
├── split_index.js                  ❌ Ở ROOT - automation script
├── package.json
└── yarn.lock
```

### ✅ PROPOSED (New Structure)

```
root/
├── apps/                           🎯 Frontend Applications
│   ├── web/
│   │   └── warehouse-dashboard/    (React/Next.js)
│   │       ├── src/
│   │       ├── public/
│   │       ├── package.json
│   │       └── tsconfig.json
│   └── mobile/
│       └── delivery-mobile-app/    (Flutter)
│           ├── lib/
│           ├── pubspec.yaml
│           └── analysis_options.yaml
│
├── services/                       🎯 Backend Microservices
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── modules/           (Feature modules)
│   │   │   │   ├── auth/
│   │   │   │   │   ├── application/    (DTOs, Use Cases, Interfaces)
│   │   │   │   │   ├── domain/         (Entities, Business Logic)
│   │   │   │   │   ├── infrastructure/ (Repos, Services)
│   │   │   │   │   └── interfaces/     (HTTP Controllers, Guards)
│   │   │   │   └── user/         (thêm module mới nếu cần)
│   │   │   ├── common/            (Shared logic cho service này)
│   │   │   ├── config/            (Environment config)
│   │   │   └── main.ts
│   │   ├── prisma/                (Service-specific DB schema)
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── order-service/
│       ├── src/
│       │   ├── modules/
│       │   │   ├── order/
│       │   │   │   ├── application/
│       │   │   │   ├── domain/
│       │   │   │   ├── infrastructure/
│       │   │   │   └── interfaces/
│       │   │   └── payment/       (thêm module mới nếu cần)
│       │   ├── common/
│       │   ├── config/
│       │   └── main.ts
│       ├── prisma/                (Service-specific DB schema)
│       ├── tests/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                       🎯 Shared Code (Monorepo Dependencies)
│   ├── types/                      (Shared TypeScript types)
│   │   ├── src/
│   │   │   ├── auth/              (Auth types)
│   │   │   ├── order/             (Order types)
│   │   │   ├── common/            (Common types)
│   │   │   └── index.ts           (Barrel export)
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── utils/                      (Utility functions)
│   │   ├── src/
│   │   │   ├── validators/        (e.g., email validation)
│   │   │   ├── formatters/        (e.g., date formatting)
│   │   │   ├── transformers/      (e.g., data transformers)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── constants/                  (Shared constants)
│   │   ├── src/
│   │   │   ├── errors/            (Error messages, codes)
│   │   │   ├── http-status/
│   │   │   ├── roles/             (User roles, permissions)
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                     (Shared config)
│       ├── src/
│       │   ├── environment/       (Env validation, parsing)
│       │   ├── database/          (Shared DB config)
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── database/                       🎯 Database (Optional - if shared DB)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── seeds/                      (Database seeds)
│   │   └── seed.ts
│   ├── package.json
│   └── tsconfig.json
│   
│ (OR: keep prisma in each service if separate DBs)
│
├── infrastructure/                 🎯 DevOps & Deployment
│   ├── docker/
│   │   ├── Dockerfile.auth
│   │   ├── Dockerfile.order
│   │   ├── Dockerfile.web
│   │   └── Dockerfile.mobile
│   ├── kubernetes/                (K8s manifests)
│   │   ├── auth-service.yaml
│   │   ├── order-service.yaml
│   │   └── ingress.yaml
│   ├── nginx/
│   │   └── conf.d/
│   ├── terraform/                 (Infrastructure as Code)
│   │   ├── main.tf
│   │   └── variables.tf
│   ├── docker-compose.yml
│   └── README.md
│
├── docs/                           🎯 Documentation
│   ├── architecture/
│   │   ├── ARCHITECTURE.md         (System design)
│   │   ├── ADRs/                   (Architecture Decision Records)
│   │   └── diagrams/
│   ├── api/                        (API documentation)
│   │   ├── auth-service.md
│   │   └── order-service.md
│   ├── database/                   (Schema, migrations)
│   ├── deployment/                 (Deployment guides)
│   ├── development/                (Setup, conventions)
│   ├── guides/                     (Onboarding, best practices)
│   ├── runbooks/                   (Operational procedures)
│   └── README.md
│
├── scripts/                        🎯 Automation & Tools
│   ├── automation/
│   │   ├── split-barrel-exports.js (✨ moved from root)
│   │   ├── generate-api-docs.js
│   │   └── setup-dev-env.sh
│   ├── database/
│   │   ├── seed.ts
│   │   └── reset.sh
│   ├── deployment/
│   │   ├── build-images.sh
│   │   └── push-registry.sh
│   ├── testing/
│   │   └── run-e2e.sh
│   └── README.md
│
├── tools/                          🎯 Development Tools & Config
│   ├── eslint/
│   │   ├── monorepo.js             (Enforce folder structure)
│   │   ├── naming.js               (Naming conventions)
│   │   └── README.md
│   ├── prettier/
│   │   └── .prettierrc.json
│   └── vscode/
│       └── settings.json
│
├── .github/                        ✅ CI/CD (keep as-is)
│   ├── workflows/
│   └── branch-scaffolds/
│
├── .vscode/                        ✅ IDE config
├── docker-compose.yml              ✅ Local dev
├── package.json                    (Root workspace)
├── tsconfig.json                   (Base config)
├── .prettierrc.json
├── .eslintrc.json
├── CLAUDE.md                       (Project conventions)
├── README.md
├── REFACTOR_PLAN.md                (This file)
└── ARCHITECTURE.md                 (System design)
```

---

## 📋 Migration Steps (Phase by Phase)

### Phase 1: Setup Infrastructure ⭐ START HERE

#### Step 1.1: Create packages structure
```bash
# Create packages folders
mkdir -p packages/{types,utils,constants,config}/src
mkdir -p packages/{types,utils,constants,config}/tests

# Move shared/types → packages/types
mv shared/types packages/types

# Create package.json files for each package
# (See samples below)
```

#### Step 1.2: Move split_index.js to scripts
```bash
mv split_index.js scripts/automation/split-barrel-exports.js
```

#### Step 1.3: Update root package.json workspaces
```json
{
  "workspaces": [
    "apps/*",
    "services/*",
    "packages/*",
    "database",
    "infrastructure"
  ]
}
```

---

### Phase 2: Database Refactor

#### Decision: Shared DB vs Per-Service DB?

**Option A: Shared Database (Current Architecture)**
```bash
# Option A: Move to packages/database
mkdir -p packages/database/prisma/migrations
mv prisma/schema.prisma packages/database/prisma/
```

**Option B: Per-Service Databases (Microservices Best Practice)**
```bash
# Option B: Each service has its own schema
mkdir -p services/auth-service/prisma/migrations
mkdir -p services/order-service/prisma/migrations

# Split schemas and migrations by service
```

**Recommendation:** Start with **Option B** (per-service) for true microservices isolation.

---

### Phase 3: Service Refactor

Each service should follow this exact structure:

```
services/[service-name]/
├── src/
│   ├── modules/                    [Feature modules]
│   │   ├── [module-a]/
│   │   │   ├── application/        [Use cases, DTOs, Interfaces]
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-[entity].dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── [entity].repository.interface.ts
│   │   │   │   │   ├── [entity].service.interface.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── create-[entity].use-case.ts
│   │   │   │   │   ├── update-[entity].use-case.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── domain/             [Business entities & logic]
│   │   │   │   ├── entities/
│   │   │   │   │   └── [entity].entity.ts
│   │   │   │   ├── enums/
│   │   │   │   │   └── [entity]-status.enum.ts
│   │   │   │   ├── exceptions/
│   │   │   │   │   └── [entity].exception.ts
│   │   │   │   └── index.ts
│   │   │   ├── infrastructure/     [Implementations]
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── [entity].repository.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── [service].service.impl.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── interfaces/         [HTTP layer]
│   │   │   │   ├── http/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   └── [entity].controller.ts
│   │   │   │   │   ├── guards/
│   │   │   │   │   │   └── auth.guard.ts
│   │   │   │   │   └── strategies/
│   │   │   │   │       └── jwt.strategy.ts
│   │   │   │   └── index.ts
│   │   │   └── [module-name].module.ts
│   │   └── [module-b]/...
│   │
│   ├── common/                     [Shared logic for this service]
│   │   ├── decorators/
│   │   ├── filters/                [Exception filters]
│   │   ├── interceptors/
│   │   ├── middleware/
│   │   ├── pipes/                  [Validation pipes]
│   │   └── index.ts
│   │
│   ├── config/                     [Service-specific config]
│   │   ├── database.config.ts
│   │   ├── environment.ts
│   │   └── index.ts
│   │
│   ├── app.module.ts               [Root module]
│   └── main.ts                     [Bootstrap]
│
├── prisma/                         [Database schema for this service]
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── unit/                       [Unit tests]
│   ├── integration/                [Integration tests]
│   └── e2e/                        [E2E tests]
│
├── .env.example
├── Dockerfile
├── docker-compose.test.yml
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

### Phase 4: Packages Setup

Each package should have:

```
packages/[package-name]/
├── src/
│   ├── [subdomain]/
│   │   └── *.ts
│   └── index.ts                    [Barrel export]
├── tests/
│   └── [package-name].spec.ts
├── package.json                    [Minimal, workspace dependency]
├── tsconfig.json                   [Extends root]
└── README.md
```

#### package.json template for packages:
```json
{
  "name": "@mono/types",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

---

## 🎯 Detailed File Mapping: Old → New

### ❌ DELETE (Anti-patterns)

| File | Reason |
|------|--------|
| `split_index.js` (root) | Move to `scripts/automation/` |
| `shared/` folder | Rename to `packages/` |
| `prompts/` (if utility files) | Document purpose or delete |

### ✅ MOVE / RENAME

| Old Path | New Path | Reason |
|----------|----------|--------|
| `shared/types/` | `packages/types/` | Standardize package naming |
| `split_index.js` | `scripts/automation/split-barrel-exports.js` | Clear purpose |
| `prisma/` (root) | `services/[service]/prisma/` | Per-service DB isolation |
| `prompts/` | `scripts/prompts/` OR document | Clarify purpose |

### 📝 UPDATE IMPORTS

After refactor, update tsconfig paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["apps/*"],
      "@services/*": ["services/*/src"],
      "@packages/*": ["packages/*/src"],
      "@types/*": ["packages/types/src"],
      "@utils/*": ["packages/utils/src"],
      "@constants/*": ["packages/constants/src"],
      "@config/*": ["packages/config/src"],
      "@auth/*": ["services/auth-service/src"],
      "@order/*": ["services/order-service/src"]
    }
  }
}
```

---

## 📐 Naming Conventions (ENFORCE)

### Files

| Type | Pattern | Example |
|------|---------|---------|
| Service | `*.service.ts` | `user.service.ts` |
| Service Impl | `*.service.impl.ts` | `hash.service.impl.ts` |
| Repository | `*.repository.ts` | `user.repository.ts` |
| Controller | `*.controller.ts` | `auth.controller.ts` |
| Use Case | `*.use-case.ts` | `login.use-case.ts` |
| Entity | `*.entity.ts` | `user.entity.ts` |
| Enum | `*.enum.ts` | `user-status.enum.ts` |
| DTO | `*.dto.ts` | `create-user.dto.ts` |
| Guard | `*.guard.ts` | `auth.guard.ts` |
| Middleware | `*.middleware.ts` | `logger.middleware.ts` |
| Index | `index.ts` | Barrel exports only |

### Folders

| Type | Pattern | Example |
|------|---------|---------|
| Module | `kebab-case` | `auth-module/` |
| Feature | `kebab-case` | `user-management/` |
| Layer | `lowercase` | `application/`, `domain/` |
| Feature-specific | `kebab-case` | `create-user/`, `forgot-password/` |

### ❌ AVOID

```typescript
// ❌ BAD
utils.ts
helpers.ts
common.ts
shared-service.ts
index.service.ts

// ✅ GOOD
date-formatter.util.ts
error-handler.util.ts
email-validator.util.ts
string.helper.ts
array.helper.ts
auth-middleware.middleware.ts
```

---

## 🔧 ESLint Rules to Enforce

Create `tools/eslint/structure.js`:

```javascript
module.exports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          // Prevent importing from parent directories
          {
            group: ['../../../*'],
            message: 'Too many directory levels up. Restructure code.'
          },
          // Prevent circular dependencies between modules
          {
            group: ['services/*/src/modules/*/application/**/../../infrastructure/*'],
            message: 'Infrastructure should not import from application layer'
          },
          // Prevent importing services from apps
          {
            group: ['services/*'],
            importNames: ['*'],
            message: 'Apps cannot import backend services directly'
          }
        ]
      }
    ],
    
    // Enforce naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE']
      }
    ]
  }
};
```

---

## 📊 Directory Structure Validation Script

Create `scripts/automation/validate-structure.js`:

```javascript
const fs = require('fs');
const path = require('path');

const ALLOWED_DIRS = {
  'apps': 'Frontend applications',
  'services': 'Backend microservices',
  'packages': 'Shared code packages',
  'database': 'Database configuration',
  'infrastructure': 'DevOps and deployment',
  'scripts': 'Automation scripts',
  'docs': 'Documentation',
  'tools': 'Development tools',
  '.github': 'CI/CD workflows',
  '.vscode': 'VS Code settings'
};

const FORBIDDEN_AT_ROOT = [
  'shared',
  'split_index.js',
  'utils',
  'helpers',
  'common'
];

function validateStructure() {
  const items = fs.readdirSync('.');
  const issues = [];
  
  // Check for forbidden items
  FORBIDDEN_AT_ROOT.forEach(forbidden => {
    if (items.includes(forbidden)) {
      issues.push(`❌ Forbidden at root: ${forbidden}`);
    }
  });
  
  // Check for unknown directories
  items.forEach(item => {
    if (!fs.statSync(item).isDirectory()) return;
    if (item.startsWith('.')) return;
    
    if (!ALLOWED_DIRS[item]) {
      issues.push(`⚠️  Unknown directory: ${item}`);
    }
  });
  
  if (issues.length === 0) {
    console.log('✅ Structure is valid!');
  } else {
    console.log('Issues found:');
    issues.forEach(issue => console.log(issue));
    process.exit(1);
  }
}

validateStructure();
```

---

## 🎯 Checklist: Refactor Steps

### Week 1: Foundation

- [ ] Create Phase 1: Setup Infrastructure
  - [ ] Create `packages/` folder structure
  - [ ] Move `shared/types` → `packages/types`
  - [ ] Create `package.json` for each package
  - [ ] Update root `package.json` workspaces
  - [ ] Move `split_index.js` → `scripts/automation/`

- [ ] Update all import paths
  - [ ] Update service imports: `../../shared/types` → `@types/*`
  - [ ] Update app imports
  - [ ] Test builds

- [ ] Create base configuration
  - [ ] Create `tsconfig.paths.json` with path aliases
  - [ ] Create `tools/eslint/` rules
  - [ ] Update `.eslintrc.json` to use rules

### Week 2: Services Refactor

- [ ] Auth Service
  - [ ] Organize modules correctly
  - [ ] Verify Clean Architecture layers
  - [ ] Update imports
  - [ ] Run tests

- [ ] Order Service
  - [ ] Same as above

- [ ] Validate all imports work

### Week 3: Documentation & Validation

- [ ] Create `ARCHITECTURE.md`
- [ ] Create validation script
- [ ] Document conventions in `CLAUDE.md`
- [ ] Run full test suite
- [ ] Update CI/CD pipelines

---

## 📚 Configuration Files to Create/Update

### 1. Root `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "baseUrl": ".",
    "paths": {
      "@services/*": ["services/*/src"],
      "@packages/*": ["packages/*/src"],
      "@types/*": ["packages/types/src"],
      "@utils/*": ["packages/utils/src"],
      "@constants/*": ["packages/constants/src"],
      "@config/*": ["packages/config/src"],
      "@auth/*": ["services/auth-service/src"],
      "@order/*": ["services/order-service/src"]
    },
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "services/*/src",
    "packages/*/src",
    "apps/*/src"
  ]
}
```

### 2. `.eslintrc.json`

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "../../../*",
          "services/*/src/modules/*/application/**/../../infrastructure/*"
        ]
      }
    ],
    "@typescript-eslint/naming-convention": "warn"
  },
  "overrides": [
    {
      "files": ["services/*/src/**/*.ts"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": ["../../*", "../../../../shared/*"]
          }
        ]
      }
    }
  ]
}
```

### 3. `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

## 🚀 Post-Refactor

### 1. Verification Steps

```bash
# Test all builds
yarn build

# Run tests
yarn test

# Run linting
yarn lint

# Validate structure
node scripts/automation/validate-structure.js
```

### 2. Update Documentation

- [ ] Update README.md with new structure
- [ ] Create ARCHITECTURE.md
- [ ] Update developer setup guide
- [ ] Document all naming conventions
- [ ] Create migration guide for developers

### 3. CI/CD Pipeline Updates

- [ ] Update build scripts
- [ ] Update deployment scripts
- [ ] Update test configurations
- [ ] Validate GitHub Actions workflows

---

## 📖 Created Documentation Files

### `docs/architecture/ARCHITECTURE.md`

```markdown
# System Architecture

## Overview

This is a monorepo with:
- **Apps**: Frontend applications (web, mobile)
- **Services**: Backend microservices (auth, order)
- **Packages**: Shared code dependencies
- **Database**: Per-service database schemas
- **Infrastructure**: DevOps and deployment configs

## Technology Stack

### Backend
- NestJS framework
- TypeScript
- Prisma ORM
- PostgreSQL / MongoDB

### Frontend
- React / Next.js (Web)
- Flutter (Mobile)

## Service Architecture

Each service follows Clean Architecture:
1. **Domain**: Business logic, entities
2. **Application**: Use cases, DTOs
3. **Infrastructure**: Data access, external services
4. **Interfaces**: HTTP controllers, guards

## Database Strategy

Each service has its own database schema (`services/[service]/prisma/`).

## Deployment

Services deployed via Docker containers to Kubernetes cluster.
See `infrastructure/kubernetes/` for manifests.
```

---

## 💡 Tips for Long-Term Maintenance

1. **Regular Structure Audits**: Run validation script in CI
2. **New Service Template**: Create boilerplate in `services/_template/`
3. **Naming Convention Enforcement**: ESLint rules in CI
4. **Import Audit**: Use dependency-cruiser to detect violations
5. **Documentation**: Keep ARCHITECTURE.md in sync

---

## 📞 Questions to Answer

1. **Database Strategy**: Shared DB or per-service?
   - **Current Choice**: Per-service (move `prisma` to each service)

2. **Monorepo Scope**: Will you add more services/apps?
   - **Plan for**: 5-10 services eventually

3. **Package Distribution**: Will packages be published to npm?
   - **Plan for**: Internal packages only (not published)

4. **API Gateway**: Do you have an API gateway?
   - **Recommendation**: Add `infrastructure/api-gateway/`

5. **Shared DB**: Any shared references between services?
   - **Recommendation**: Use event-driven communication instead

---

## ✅ Success Criteria

After refactor:
- ✅ Clear separation of concerns
- ✅ Easy to add new services/apps
- ✅ Naming conventions enforced by linting
- ✅ All imports use path aliases
- ✅ No circular dependencies
- ✅ Build/test/lint all pass
- ✅ New developers can onboard in < 1 hour

---

**Next Steps**: Choose database strategy and begin Phase 1! 🚀

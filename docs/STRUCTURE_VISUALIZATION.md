# 🏗️ Monorepo Structure Visualization

## Current State (Before Refactor)

```
.
├── apps/                     ✅ OK
│   ├── mobile/
│   └── web/
├── services/                 ✅ OK
│   ├── auth-service/src/modules/...
│   └── order-service/src/modules/...
├── shared/                   ⚠️ Needs rename
│   └── types/
├── prisma/                   ❌ ROOT - should be per-service
├── docs/                     ✅ OK
├── infrastructure/           ✅ OK
├── scripts/                  ⚠️ Incomplete
├── prompts/                  ❓ Unclear purpose
├── split_index.js            ❌ Should be in scripts
├── docker-compose.yml
└── package.json
```

**Issues:**
- ❌ `prisma/` at root (shared DB schema)
- ❌ `split_index.js` at root (automation script)
- ⚠️ `shared/` naming (should be `packages/`)
- ❌ Missing `packages/utils`, `packages/constants`, `packages/config`
- ❓ `prompts/` purpose unclear

**Import Paths (Current - Ugly):**
```
import { User } from '../../shared/types';
import validateEmail from '../../../../../utils/validators.ts';
```

---

## Proposed New Structure (After Refactor)

```
.
├── 📦 apps/
│   ├── mobile/
│   │   └── delivery-mobile-app/
│   │       ├── lib/
│   │       ├── pubspec.yaml
│   │       └── ...
│   └── web/
│       └── warehouse-dashboard/
│           ├── src/
│           ├── public/
│           ├── package.json
│           └── ...
│
├── 🎯 services/
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   └── auth/
│   │   │   │       ├── application/
│   │   │   │       │   ├── dto/
│   │   │   │       │   ├── interfaces/
│   │   │   │       │   └── use-cases/
│   │   │   │       ├── domain/
│   │   │   │       │   ├── entities/
│   │   │   │       │   └── enums/
│   │   │   │       ├── infrastructure/
│   │   │   │       │   ├── repositories/
│   │   │   │       │   └── services/
│   │   │   │       └── interfaces/
│   │   │   │           └── http/
│   │   │   ├── common/
│   │   │   ├── config/
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── order-service/
│       └── (same structure as auth-service)
│
├── 📦 packages/
│   ├── types/
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── user.type.ts
│   │   │   │   ├── token.type.ts
│   │   │   │   └── index.ts
│   │   │   ├── order/
│   │   │   ├── common/
│   │   │   └── index.ts
│   │   ├── tests/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── utils/
│   │   ├── src/
│   │   │   ├── validators/
│   │   │   │   ├── email.validator.ts
│   │   │   │   ├── password.validator.ts
│   │   │   │   └── index.ts
│   │   │   ├── formatters/
│   │   │   │   ├── date.formatter.ts
│   │   │   │   └── index.ts
│   │   │   ├── transformers/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── constants/
│   │   ├── src/
│   │   │   ├── errors/
│   │   │   │   ├── auth-errors.ts
│   │   │   │   └── index.ts
│   │   │   ├── http-status/
│   │   │   ├── roles/
│   │   │   │   ├── user-roles.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── config/
│       ├── src/
│       │   ├── environment/
│       │   │   ├── env.schema.ts
│       │   │   ├── env.loader.ts
│       │   │   └── index.ts
│       │   ├── database/
│       │   │   ├── database.config.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── tests/
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── 🗄️ database/ (Optional - if shared DB)
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── seeds/
│   │   └── seed.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── 🛠️ infrastructure/
│   ├── docker/
│   │   ├── Dockerfile.auth-service
│   │   ├── Dockerfile.order-service
│   │   ├── Dockerfile.web
│   │   └── docker-compose.yml
│   ├── kubernetes/
│   │   ├── auth-service.yaml
│   │   ├── order-service.yaml
│   │   └── ingress.yaml
│   ├── nginx/
│   │   └── conf.d/
│   ├── terraform/
│   │   ├── main.tf
│   │   └── variables.tf
│   └── README.md
│
├── 📚 docs/
│   ├── architecture/
│   │   ├── ARCHITECTURE.md
│   │   ├── ADRs/
│   │   └── diagrams/
│   ├── api/
│   │   ├── auth-service.md
│   │   └── order-service.md
│   ├── database/
│   ├── deployment/
│   ├── development/
│   ├── guides/
│   ├── runbooks/
│   └── README.md
│
├── 🚀 scripts/
│   ├── automation/
│   │   ├── split-barrel-exports.js    ← MOVED from root
│   │   ├── generate-api-docs.js
│   │   ├── validate-structure.js
│   │   └── README.md
│   ├── database/
│   │   ├── seed.ts
│   │   ├── reset.sh
│   │   └── README.md
│   ├── deployment/
│   │   ├── build-images.sh
│   │   ├── push-registry.sh
│   │   └── README.md
│   ├── testing/
│   │   └── run-e2e.sh
│   ├── prompts/                       ← MOVED from root
│   │   └── [llm-prompts].txt
│   └── README.md
│
├── 🛠️ tools/
│   ├── eslint/
│   │   ├── monorepo.js
│   │   ├── naming.js
│   │   └── README.md
│   ├── prettier/
│   │   └── .prettierrc.json
│   └── vscode/
│       └── settings.json
│
├── 🔄 CI/CD & Config
│   ├── .github/
│   │   ├── workflows/
│   │   └── branch-scaffolds/
│   ├── .vscode/
│   ├── .gitignore
│   ├── .eslintrc.json           ← NEW
│   ├── .prettierrc.json         ← NEW
│   ├── docker-compose.yml
│   ├── tsconfig.json            ← UPDATED
│   ├── package.json             ← UPDATED
│   ├── yarn.lock
│   │
│   └── 📖 Documentation (Root)
│       ├── REFACTOR_INDEX.md        ← Navigation hub
│       ├── REFACTOR_PLAN.md         ← Migration steps
│       ├── FILE_MIGRATION_MAPPING.md ← Old → New mapping
│       ├── CONFIG_FILES_TEMPLATES.md ← Configuration examples
│       ├── ARCHITECTURE.md           ← System design
│       ├── CLAUDE.md                ← Code conventions
│       └── README.md                ← Project overview
```

---

## Directory Tree Comparison

### ❌ BEFORE (Problem: Scattered structure)

```
Root has 9+ top-level items:
- apps/
- services/
- shared/           ← Wrong name
- prisma/           ← Should be per-service
- docs/
- infrastructure/
- scripts/
- prompts/          ← Unclear
- split_index.js    ← In root (bad)
```

### ✅ AFTER (Solution: Organized structure)

```
Root has 9 well-organized categories:
- apps/             ← Frontend
- services/         ← Backend
- packages/         ← Shared code
- database/         ← DB config (optional)
- infrastructure/   ← DevOps
- scripts/          ← Tools & automation
- docs/             ← Documentation
- tools/            ← Dev tools
- .github/          ← CI/CD

All config & docs at root level - clear and consistent!
```

---

## Service Structure Deep Dive

### Before (Current)
```
services/auth-service/src/
├── modules/auth/...    ← Already good!
├── modules/user/...    ← Good
└── main.ts

❓ Missing:
- common/
- config/
- tests/
- prisma/
```

### After (Proposed)
```
services/auth-service/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── application/
│   │   │   ├── domain/
│   │   │   ├── infrastructure/
│   │   │   └── interfaces/
│   │   └── user/
│   ├── common/          ← NEW
│   ├── config/          ← NEW
│   ├── app.module.ts
│   └── main.ts
├── prisma/              ← NEW (moved from root)
├── tests/               ← NEW
├── Dockerfile           ← NEW
├── package.json
├── tsconfig.json
└── README.md            ← NEW
```

---

## Import Paths Transformation

### ❌ UGLY (Current Relative Paths)

```typescript
// Deep relative paths are hard to understand
import { User } from '../../shared/types';
import { LoginUseCase } from '../modules/auth/application/use-cases/login.use-case';
import { AuthGuard } from '../modules/auth/interfaces/http/guards/auth.guard';
import { validateEmail } from '../../../../../../../utils/validators';

// Long and fragile - breaks when moving files
```

### ✅ BEAUTIFUL (After Refactor with Aliases)

```typescript
// Clear, semantic, maintainable
import { User } from '@types/auth';
import { LoginUseCase } from '@auth/modules/auth/application/use-cases';
import { AuthGuard } from '@auth/modules/auth/interfaces/http/guards';
import { validateEmail } from '@utils/validators';

// Short aliases - doesn't break when moving files
```

**Path Alias Configuration (tsconfig.json):**
```json
{
  "paths": {
    "@types": ["packages/types/src"],
    "@utils": ["packages/utils/src"],
    "@constants": ["packages/constants/src"],
    "@config": ["packages/config/src"],
    "@auth/*": ["services/auth-service/src/*"],
    "@order/*": ["services/order-service/src/*"]
  }
}
```

---

## Layer Separation Visualization

### Architecture Layers (Per Service)

```
┌────────────────────────────────────────────┐
│     interfaces/ (HTTP Layer)               │
│  Controllers, Guards, Filters, Pipes       │
│                                            │
│  ✓ Handles HTTP requests                 │
│  ✓ Validates input                       │
│  ✓ Returns responses                     │
└────────────────────────────────────────────┘
                    ▲
                    │ (depends on)
                    │
┌────────────────────────────────────────────┐
│  application/ (Use Case Layer)             │
│  DTOs, Use Cases, Application Services     │
│                                            │
│  ✓ Orchestrates business operations      │
│  ✓ Validates business rules              │
│  ✓ Coordinates infrastructure            │
└────────────────────────────────────────────┘
                    ▲
                    │ (depends on)
                    │
┌────────────────────────────────────────────┐
│   domain/ (Business Logic Layer)           │
│  Entities, Value Objects, Enums            │
│                                            │
│  ✓ Contains pure business logic           │
│  ✓ No framework dependencies              │
│  ✓ Reusable across projects              │
└────────────────────────────────────────────┘
                    ▲
                    │ (depends on)
                    │
┌────────────────────────────────────────────┐
│  infrastructure/ (Data Access Layer)       │
│  Repositories, External Services           │
│                                            │
│  ✓ Accesses databases                    │
│  ✓ Calls external APIs                   │
│  ✓ Implements interfaces                 │
└────────────────────────────────────────────┘
```

**Key Rule:** Lower layers never import from upper layers!

```
❌ Domain should NOT import from Application
❌ Application should NOT import from Interfaces
✅ Interfaces can import from Application
✅ Application can import from Domain
✅ Infrastructure can import from Domain
```

---

## Package Dependencies Graph

```
Dependency Flow (Top = depends on, Bottom = independent)

┌─────────────────────────────────────────────┐
│  @services/auth-service                    │
│  @services/order-service                   │
│  @apps/web                                  │
│  @apps/mobile                               │
└─────────────────┬───────────────────────────┘
                  │ imports
                  ▼
┌─────────────────────────────────────────────┐
│  @packages/types                            │
│  @packages/utils                            │
│  @packages/constants                        │
│  @packages/config                           │
└─────────────────┬───────────────────────────┘
                  │ depends on
                  ▼
┌─────────────────────────────────────────────┐
│  External: NestJS, Prisma, React, etc       │
└─────────────────────────────────────────────┘

Rule: 
- Services/Apps depend on packages ✅
- Packages do NOT depend on services ❌
- Packages do NOT depend on apps ❌
- No circular dependencies ✅
```

---

## Migration Checklist - File by File

### Move Operations

```
split_index.js
└─→ scripts/automation/split-barrel-exports.js

shared/
└─→ packages/
    ├─ shared/types/     → packages/types/
    ├─ (NEW)            → packages/utils/
    ├─ (NEW)            → packages/constants/
    └─ (NEW)            → packages/config/

prisma/ (root)
├─→ services/auth-service/prisma/
└─→ services/order-service/prisma/

prompts/
└─→ scripts/prompts/
```

### Create Operations

```
(NEW) packages/utils/
(NEW) packages/constants/
(NEW) packages/config/
(NEW) services/auth-service/prisma/
(NEW) services/auth-service/tests/
(NEW) services/auth-service/common/
(NEW) services/order-service/prisma/
(NEW) services/order-service/tests/
(NEW) services/order-service/common/
(NEW) infrastructure/docker/
(NEW) infrastructure/kubernetes/
(NEW) infrastructure/terraform/
(NEW) tools/eslint/
(NEW) tools/prettier/
(NEW) scripts/automation/
(NEW) scripts/database/
(NEW) scripts/deployment/
(NEW) scripts/testing/
```

### Keep Operations (No Changes)

```
✅ apps/
✅ services/auth-service/src/modules/
✅ services/order-service/src/modules/
✅ docs/
✅ infrastructure/ (extend it)
✅ .github/
✅ .vscode/
```

### Update Operations (Modify)

```
🔄 package.json (workspaces)
🔄 tsconfig.json (add paths)
🔄 .eslintrc.json (add rules)
🔄 README.md (update structure)
🔄 All imports (old paths → new aliases)
```

---

## Timeline & Effort

```
Phase 1: Foundation
├─ Create folders
├─ Move files
├─ Update config
└─ Time: 2-3 hours

Phase 2: Database
├─ Analyze schemas
├─ Split per-service
└─ Time: 3-4 hours

Phase 3: Services
├─ Refactor structure
├─ Add missing layers
└─ Time: 4-6 hours

Phase 4: Packages
├─ Create packages
├─ Extract shared code
└─ Time: 2 hours

Phase 5: Imports
├─ Update all imports
├─ Verify builds
└─ Time: 2-3 hours

Phase 6: Linting
├─ Setup ESLint rules
├─ Fix violations
└─ Time: 2 hours

Phase 7: Documentation
├─ Update docs
├─ Train team
└─ Time: 1-2 hours

TOTAL: 16-21 hours (2-3 days of focused work)
```

---

## Success Metrics After Refactor

```
✅ All imports use @alias syntax (0 relative paths with ../../)
✅ ESLint passes with 0 errors
✅ No unused files or imports
✅ All tests pass
✅ Build time < 30 seconds
✅ New services can be added in < 1 hour
✅ New developer can onboard in < 2 hours
✅ Documentation is up-to-date
✅ CI/CD pipeline passes
✅ Performance metrics unchanged
```

---

## File Location Quick Reference

```
I need to...                          Go to...

Add a new use case                    services/[service]/src/modules/[feature]/application/use-cases/
Add a new controller                  services/[service]/src/modules/[feature]/interfaces/http/controllers/
Add database entity                   services/[service]/src/modules/[feature]/domain/entities/
Access database                       services/[service]/src/modules/[feature]/infrastructure/repositories/
Add shared validator                  packages/utils/src/validators/
Add shared constant                   packages/constants/src/[domain]/
Add shared type                       packages/types/src/[domain]/
Add automation script                 scripts/automation/
Add deployment config                 infrastructure/kubernetes/ or infrastructure/docker/
Add documentation                     docs/[topic]/
Add CI/CD workflow                    .github/workflows/
```

---

**Status:** Ready for Implementation ✅  
**Last Updated:** 2026-04-26  
**Next Step:** Start with Phase 1 in REFACTOR_PLAN.md

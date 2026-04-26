# 📑 File Migration Mapping: Old → New

## Summary Statistics

| Category | Count | Status |
|----------|-------|--------|
| **Keep As-Is** | 15+ | ✅ |
| **Move to New Location** | 7 | 🔄 |
| **Rename + Move** | 1 | 🔄 |
| **Delete** | 1 | ❌ |
| **Refactor** | 2 | ⚠️ |

---

## 📊 Complete File Mapping

### ✅ KEEP (No Changes)

```
.git/                               → .git/
.github/                            → .github/
.vscode/                            → .vscode/
docs/                               → docs/
infrastructure/                     → infrastructure/
apps/                               → apps/
services/*/src/modules/             → services/*/src/modules/ (layer structure OK)
.gitignore                          → .gitignore
.eslintignore                       → .eslintignore
.prettierignore                     → .prettierignore
.markdownlint.json                  → .markdownlint.json
docker-compose.yml                  → docker-compose.yml
yarn.lock                           → yarn.lock
README.md                           → README.md (update references)
```

---

### 🔄 MOVE

#### 1. Split Index Script
```
split_index.js (root)
    ↓↓↓
scripts/automation/split-barrel-exports.js
```

**Changes needed:**
- Update file paths in script if they are hardcoded
- Update npm scripts if referenced

---

#### 2. Shared Types Package
```
shared/types/
    ↓↓↓
packages/types/
```

**Changes needed:**
- Update `shared/types/package.json` → `packages/types/package.json`
- Update all imports: `../../shared/types` → `@types/*`
- Update `tsconfig.json` paths

**Files affected:**
- `services/auth-service/src/modules/auth/**/*.ts`
- `services/order-service/src/modules/order/**/*.ts`
- `apps/web/warehouse-dashboard/**/*.ts` (if used)
- `apps/mobile/delivery-mobile-app/**/*.dart` (if applicable)

---

#### 3. Create Packages Structure

```
# CREATE NEW
packages/utils/                     (New package)
packages/constants/                 (New package)
packages/config/                    (New package)
```

---

#### 4. Database Schema
```
prisma/ (root)
    ↓↓↓
services/auth-service/prisma/
services/order-service/prisma/
```

**Action needed:**
- Analyze current `prisma/schema.prisma`
- Split into service-specific schemas
- Migrate data if needed

**Current assumption:**
- Shared DB with tables for both services
- Need to split migrations

---

#### 5. Prompts Folder
```
prompts/                            → scripts/prompts/ OR delete
```

**Decision needed:**
- Is this folder for LLM prompts? If yes:
  - Move to `scripts/prompts/`
  - Or move to `docs/prompts/`
- If legacy/unused: Delete

---

### 📝 Import Path Changes

#### Pattern 1: From Shared Types

**BEFORE:**
```typescript
import { User } from '../../shared/types';
import { UserDTO } from '../../../../shared/types';
```

**AFTER:**
```typescript
import { User } from '@types';
import { UserDTO } from '@types';
```

---

#### Pattern 2: Between Services (AVOID)

**BEFORE (BAD):**
```typescript
// In order-service
import { AuthService } from '../../../services/auth-service/src/...'
```

**AFTER (GOOD):**
```typescript
// Use event-driven communication via message queue
// or REST API calls instead of direct imports
```

---

#### Pattern 3: From Utils Package

**BEFORE (doesn't exist yet):**
```typescript
// Would be scattered utility files
```

**AFTER:**
```typescript
import { validateEmail } from '@utils/validators';
import { formatDate } from '@utils/formatters';
import { ERROR_MESSAGES } from '@constants/errors';
```

---

## 🎯 Import Path Configuration

Add to `tsconfig.json` at root:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Services
      "@services/*": ["services/*/src"],
      "@auth/*": ["services/auth-service/src"],
      "@order/*": ["services/order-service/src"],
      
      // Packages (shared code)
      "@packages/*": ["packages/*/src"],
      "@types": ["packages/types/src"],
      "@types/*": ["packages/types/src/*"],
      "@utils": ["packages/utils/src"],
      "@utils/*": ["packages/utils/src/*"],
      "@constants": ["packages/constants/src"],
      "@constants/*": ["packages/constants/src/*"],
      "@config": ["packages/config/src"],
      "@config/*": ["packages/config/src/*"],
      
      // Apps
      "@apps/*": ["apps/*/src"],
      
      // Database (if centralized)
      "@database/*": ["database/src/*"],
      "@prisma": ["database/prisma"]
    }
  }
}
```

---

## 📦 New Package Templates

### Template 1: `packages/types/package.json`

```json
{
  "name": "@mono/types",
  "version": "1.0.0",
  "description": "Shared TypeScript type definitions",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./auth": "./src/auth/index.ts",
    "./order": "./src/order/index.ts",
    "./common": "./src/common/index.ts"
  },
  "scripts": {
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  },
  "keywords": ["types", "shared"],
  "author": "Team",
  "license": "MIT"
}
```

---

### Template 2: `packages/utils/package.json`

```json
{
  "name": "@mono/utils",
  "version": "1.0.0",
  "description": "Shared utility functions",
  "private": true,
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./validators": "./src/validators/index.ts",
    "./formatters": "./src/formatters/index.ts",
    "./transformers": "./src/transformers/index.ts"
  },
  "scripts": {
    "lint": "eslint src",
    "test": "jest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@mono/types": "*"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

---

### Template 3: `packages/constants/package.json`

```json
{
  "name": "@mono/constants",
  "version": "1.0.0",
  "description": "Shared constants and enums",
  "private": true,
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./errors": "./src/errors/index.ts",
    "./http-status": "./src/http-status/index.ts",
    "./roles": "./src/roles/index.ts"
  },
  "scripts": {
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  }
}
```

---

### Template 4: `packages/config/package.json`

```json
{
  "name": "@mono/config",
  "version": "1.0.0",
  "description": "Shared configuration",
  "private": true,
  "main": "src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./environment": "./src/environment/index.ts",
    "./database": "./src/database/index.ts"
  },
  "scripts": {
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "joi": "^17.0.0"
  }
}
```

---

## 📁 New Package Directory Structure

### `packages/types/src/`

```
packages/types/src/
├── auth/
│   ├── user.type.ts
│   ├── token.type.ts
│   └── index.ts
├── order/
│   ├── order.type.ts
│   ├── payment.type.ts
│   └── index.ts
├── common/
│   ├── response.type.ts
│   ├── pagination.type.ts
│   └── index.ts
└── index.ts                        (Barrel export)
```

**File: `packages/types/src/index.ts`**
```typescript
export * from './auth';
export * from './order';
export * from './common';
```

---

### `packages/utils/src/`

```
packages/utils/src/
├── validators/
│   ├── email.validator.ts
│   ├── password.validator.ts
│   ├── phone.validator.ts
│   └── index.ts
├── formatters/
│   ├── date.formatter.ts
│   ├── currency.formatter.ts
│   └── index.ts
├── transformers/
│   ├── pagination.transformer.ts
│   ├── response.transformer.ts
│   └── index.ts
└── index.ts
```

**File: `packages/utils/src/validators/email.validator.ts`**
```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateStrongPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('Must contain uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Must contain lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Must contain number');
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

---

### `packages/constants/src/`

```
packages/constants/src/
├── errors/
│   ├── auth-errors.ts
│   ├── order-errors.ts
│   ├── http-errors.ts
│   └── index.ts
├── http-status/
│   ├── status-codes.ts
│   ├── status-messages.ts
│   └── index.ts
├── roles/
│   ├── user-roles.ts
│   ├── permissions.ts
│   └── index.ts
└── index.ts
```

**File: `packages/constants/src/errors/auth-errors.ts`**
```typescript
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid token',
  UNAUTHORIZED: 'Unauthorized access'
} as const;

export type AuthErrorKey = keyof typeof AUTH_ERRORS;
```

**File: `packages/constants/src/roles/user-roles.ts`**
```typescript
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  CUSTOMER = 'customer'
}

export enum Permission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  ADMIN = 'admin'
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [Permission.READ, Permission.WRITE, Permission.DELETE, Permission.ADMIN],
  [UserRole.MANAGER]: [Permission.READ, Permission.WRITE],
  [UserRole.USER]: [Permission.READ, Permission.WRITE],
  [UserRole.CUSTOMER]: [Permission.READ]
};
```

---

### `packages/config/src/`

```
packages/config/src/
├── environment/
│   ├── env.schema.ts
│   ├── env.loader.ts
│   └── index.ts
├── database/
│   ├── database.config.ts
│   └── index.ts
└── index.ts
```

**File: `packages/config/src/environment/env.schema.ts`**
```typescript
import * as joi from 'joi';

export const envSchema = joi.object({
  // Core
  NODE_ENV: joi.string().required().valid('development', 'production', 'test'),
  APP_NAME: joi.string().required(),
  
  // Server
  PORT: joi.number().required(),
  HOST: joi.string().default('0.0.0.0'),
  
  // Database
  DATABASE_URL: joi.string().required(),
  
  // Auth
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRY: joi.string().default('24h'),
  
  // APIs
  AUTH_SERVICE_URL: joi.string().required(),
  ORDER_SERVICE_URL: joi.string().required()
});

export type EnvConfig = joi.DescribedSchema;
```

---

## 🔄 Migration Workflow

### Step 1: Backup Current State
```bash
git commit -m "backup: before refactor"
git branch refactor-backup
```

### Step 2: Create New Structure
```bash
# Create packages
mkdir -p packages/{types,utils,constants,config}/{src,tests}

# Create package.json files (use templates above)

# Create scripts folder structure
mkdir -p scripts/automation
mkdir -p scripts/database
mkdir -p scripts/deployment
```

### Step 3: Move Files
```bash
# Move shared/types → packages/types
mv shared/types/* packages/types/
rmdir shared/types

# Move split_index.js
mv split_index.js scripts/automation/split-barrel-exports.js

# Update database
mkdir -p services/auth-service/prisma
mkdir -p services/order-service/prisma
# (analyze and split schema)
```

### Step 4: Update Imports Globally
```bash
# Use find and replace in IDE or script
# Pattern: '../../shared/types' → '@types'
# Pattern: '../../../../../../shared/types' → '@types'
```

### Step 5: Test
```bash
yarn install
yarn build
yarn test
yarn lint
```

### Step 6: Update Documentation
```bash
# Update README.md
# Update ARCHITECTURE.md
# Update CLAUDE.md
```

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Circular Imports After Refactor

**Problem:**
```
packages/utils → packages/types → packages/config → packages/utils
```

**Solution:**
- Keep dependency direction strict: `utils` → `types` (types should be pure types)
- Don't import types from utils in constants

---

### Pitfall 2: Breaking CI/CD Pipelines

**Solution:**
- Update all build scripts before pushing
- Test locally first: `yarn build && yarn test`
- Update GitHub Actions workflows

---

### Pitfall 3: Import Paths Not Resolving

**Solution:**
- Ensure `tsconfig.json` paths match actual file locations
- Add `tsconfig.json` to each service/app
- Test with `tsc --noEmit`

---

### Pitfall 4: Service-to-Service Direct Imports

**Problem:**
```typescript
// ❌ BAD - creates tight coupling
import { AuthService } from '@auth/infrastructure/services';
```

**Solution:**
```typescript
// ✅ GOOD - use HTTP/events
const response = await fetch('http://auth-service:3001/api/verify');

// ✅ GOOD - use event queue
eventBus.emit('user.login', { userId: 123 });
```

---

## 📋 Verification Checklist

- [ ] All `*.ts` files compile without errors
- [ ] No import paths use `../../../../`
- [ ] No service imports other services directly
- [ ] All tests pass
- [ ] ESLint passes
- [ ] `split_index.js` moved to scripts
- [ ] `shared/` renamed to `packages/`
- [ ] `prisma/` moved to services
- [ ] `tsconfig.json` path aliases working
- [ ] `package.json` workspaces updated
- [ ] CI/CD pipelines updated
- [ ] Documentation updated

---

## 🎓 Example: Moving a Service Import

### Before Refactor

```typescript
// services/order-service/src/modules/order/application/use-cases/create-order.use-case.ts

import { AuthService } from '../../../../../auth-service/src/infrastructure/services/jwt-.service.impl';

export class CreateOrderUseCase {
  constructor(private authService: AuthService) {}
  
  async execute(command: CreateOrderCommand) {
    const user = await this.authService.validateToken(command.token);
    // ...
  }
}
```

### After Refactor (Event-Driven)

```typescript
// services/order-service/src/modules/order/application/use-cases/create-order.use-case.ts

import { Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

export class CreateOrderUseCase {
  constructor(private eventBus: EventBus) {}
  
  async execute(command: CreateOrderCommand) {
    // Order service publishes event
    this.eventBus.publish(new OrderCreatedEvent(command));
    
    // Auth service listens and processes independently
    // or validates via REST API
    const response = await fetch(`${process.env.AUTH_SERVICE_URL}/verify`, {
      method: 'POST',
      body: JSON.stringify({ token: command.token })
    });
  }
}
```

---

**Total Refactor Time Estimate:**
- Phase 1 (Setup): 2-3 hours
- Phase 2 (Services): 4-6 hours
- Phase 3 (Validation): 2-3 hours
- **Total: 8-12 hours** for a 2-service system

For each additional service: +2 hours

# 📐 Configuration Files & ESLint Rules

## 1. Root `tsconfig.json` (Complete)

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2020",
    "lib": ["ES2020"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": true,
    
    /* Module Resolution */
    "module": "commonjs",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      /* Services */
      "@services/*": ["services/*/src"],
      "@auth/*": ["services/auth-service/src"],
      "@auth/modules/*": ["services/auth-service/src/modules/*"],
      "@order/*": ["services/order-service/src"],
      "@order/modules/*": ["services/order-service/src/modules/*"],
      
      /* Packages (Shared Code) */
      "@packages/*": ["packages/*/src"],
      "@types": ["packages/types/src"],
      "@types/*": ["packages/types/src/*"],
      "@utils": ["packages/utils/src"],
      "@utils/*": ["packages/utils/src/*"],
      "@constants": ["packages/constants/src"],
      "@constants/*": ["packages/constants/src/*"],
      "@config": ["packages/config/src"],
      "@config/*": ["packages/config/src/*"],
      
      /* Apps */
      "@apps/*": ["apps/*/src"],
      
      /* Database (if shared) */
      "@database/*": ["database/src/*"]
    },
    "rootDirs": [
      "services/auth-service/src",
      "services/order-service/src",
      "packages/types/src",
      "packages/utils/src",
      "packages/constants/src",
      "packages/config/src"
    ],
    
    /* Emit */
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    "preserveConstEnums": true,
    
    /* Interop Constraints */
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    
    /* Type Checking */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true
  },
  "include": [
    "services/*/src/**/*",
    "packages/*/src/**/*",
    "apps/*/src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/dist",
    "**/build",
    "**/*.spec.ts",
    "**/*.test.ts"
  ]
}
```

---

## 2. Root `.eslintrc.json` (Complete)

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint",
    "import"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  },
  "rules": {
    /* Naming Conventions */
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        "selector": "default",
        "format": ["camelCase"],
        "leadingUnderscore": "allow",
        "trailingUnderscore": "allow"
      },
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      },
      {
        "selector": "function",
        "format": ["camelCase"]
      },
      {
        "selector": "classProperty",
        "modifiers": ["private"],
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      }
    ],

    /* Import Rules - Enforce Structure */
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          /* Prevent too many directory levels */
          "../../../*",
          "../../../../*",
          "../../../../../*",
          
          /* Prevent apps importing services */
          {
            "group": ["services/*"],
            "message": "Apps cannot import from services. Use HTTP API instead."
          },
          
          /* Prevent services importing each other */
          {
            "group": ["services/*/src/**"],
            "importNames": ["*"],
            "message": "Services cannot import from other services. Use events/API communication."
          },
          
          /* Prevent circular dependencies in layers */
          {
            "group": ["services/*/src/modules/*/application/**/../../infrastructure/**"],
            "message": "Application layer cannot import from infrastructure layer."
          },
          {
            "group": ["services/*/src/modules/*/interfaces/**/../../domain/**"],
            "message": "Interfaces layer should not import domain logic directly."
          }
        ]
      }
    ],

    "import/no-restricted-paths": [
      "error",
      {
        "zones": [
          {
            "target": "services/*/src/modules/*/application",
            "from": "services/*/src/modules/*/infrastructure",
            "message": "Application should not depend on infrastructure. Use dependency injection."
          },
          {
            "target": "services/*/src/modules/*/domain",
            "from": "services/*/src",
            "message": "Domain layer should be independent."
          },
          {
            "target": "apps",
            "from": "services",
            "message": "Apps cannot import services directly."
          }
        ]
      }
    ],

    "import/order": [
      "warn",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "alphabeticalOrder": true,
        "newlines-between": "always"
      }
    ],

    /* File Naming - detect common mistakes */
    "no-restricted-files": [
      "warn",
      {
        "paths": ["**/*.utils.ts", "**/*.helpers.ts", "**/*.common.ts"],
        "message": "Avoid generic filenames. Use specific names like email-validator.util.ts"
      }
    ],

    /* TypeScript Rules */
    "@typescript-eslint/explicit-function-return-types": [
      "warn",
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true,
        "allowHigherOrderFunctions": true
      }
    ],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],

    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",

    /* General */
    "no-console": [
      "warn",
      {
        "allow": ["warn", "error"]
      }
    ],

    "no-debugger": "error",
    "no-eval": "error",
    "prefer-const": "warn",
    "no-var": "error"
  },

  "overrides": [
    {
      "files": ["services/*/src/**/*.ts"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              "services/*/src/**",
              "../../*",
              "../../../../shared/*"
            ]
          }
        ]
      }
    },
    {
      "files": ["packages/*/src/**/*.ts"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              "services/*",
              "apps/*"
            ]
          }
        ]
      }
    },
    {
      "files": ["apps/*/src/**/*.ts"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              "services/*"
            ]
          }
        ]
      }
    },
    {
      "files": ["**/*.spec.ts", "**/*.test.ts"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off"
      }
    }
  ]
}
```

---

## 3. `.prettierrc.json`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "embeddedLanguageFormatting": "auto"
}
```

---

## 4. NestJS Module Structure Template

**File: `services/[service]/src/modules/[feature]/[feature].module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma.service';

// Use Cases
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';

// Controllers
import { UserController } from './interfaces/http/controllers/user.controller';

// Repositories
import { UserRepository } from './infrastructure/repositories/user.repository';

// Services
import { HashService } from './infrastructure/services/hash.service.impl';

// Guards
import { AuthGuard } from './interfaces/http/guards/auth.guard';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    // Use Cases
    CreateUserUseCase,
    GetUserUseCase,
    
    // Infrastructure
    UserRepository,
    HashService,
    
    // Guards
    AuthGuard,
    
    // Base Services
    PrismaService
  ],
  exports: [
    CreateUserUseCase,
    GetUserUseCase,
    UserRepository
  ]
})
export class UserModule {}
```

---

## 5. Docker Build (Per-Service)

**File: `infrastructure/docker/Dockerfile.auth-service`**

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /build

# Copy workspace root config
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY .prettierrc.json .eslintrc.json ./

# Copy packages
COPY packages ./packages

# Copy service
COPY services/auth-service ./services/auth-service

# Install and build
RUN yarn install --frozen-lockfile
RUN yarn workspace @services/auth-service build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /build/services/auth-service/dist ./dist
COPY --from=builder /build/services/auth-service/package.json ./
COPY --from=builder /build/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "dist/main.js"]
```

---

## 6. GitHub Actions Workflow

**File: `.github/workflows/build-and-test.yml`**

```yaml
name: Build & Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Lint all packages
        run: yarn lint
      
      - name: Type check
        run: yarn workspaces run type-check
      
      - name: Build all packages
        run: yarn build
      
      - name: Run tests
        run: yarn test:ci
      
      - name: Validate structure
        run: node scripts/automation/validate-structure.js
```

---

## 7. Service `package.json` Template

**File: `services/[service]/package.json`**

```json
{
  "name": "@services/auth-service",
  "version": "1.0.0",
  "description": "Authentication microservice",
  "private": true,
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "nest start --watch",
    "debug": "nest start --debug --watch",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "test:ci": "jest --coverage --ci",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@prisma/client": "^5.0.0",
    "@mono/types": "*",
    "@mono/utils": "*",
    "@mono/constants": "*",
    "@mono/config": "*",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "prisma": "^5.0.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 8. Validation Script

**File: `scripts/automation/validate-structure.js`**

```javascript
const fs = require('fs');
const path = require('path');

const ALLOWED_ROOT_DIRS = {
  'apps': 'Frontend applications',
  'services': 'Backend microservices',
  'packages': 'Shared code',
  'database': 'Database configuration',
  'infrastructure': 'DevOps',
  'docs': 'Documentation',
  'scripts': 'Automation',
  'tools': 'Dev tools',
  '.github': 'CI/CD',
  '.vscode': 'IDE'
};

const FORBIDDEN_AT_ROOT = ['shared', 'utils', 'helpers', 'common', 'split_index.js'];

const REQUIRED_FILES = [
  'package.json',
  'tsconfig.json',
  '.eslintrc.json',
  '.prettierrc.json',
  'README.md'
];

function validateStructure() {
  console.log('🔍 Validating monorepo structure...\n');
  
  let hasErrors = false;
  
  // Check for forbidden items at root
  FORBIDDEN_AT_ROOT.forEach(forbidden => {
    const fullPath = path.join('.', forbidden);
    if (fs.existsSync(fullPath)) {
      console.error(`❌ Found forbidden at root: ${forbidden}`);
      hasErrors = true;
    }
  });
  
  // Check root files exist
  REQUIRED_FILES.forEach(file => {
    if (!fs.existsSync(file)) {
      console.error(`❌ Missing required file: ${file}`);
      hasErrors = true;
    }
  });
  
  // Check allowed directories
  const items = fs.readdirSync('.');
  items.forEach(item => {
    if (!fs.statSync(item).isDirectory()) return;
    if (item.startsWith('.')) return;
    if (item === 'node_modules') return;
    
    if (!ALLOWED_ROOT_DIRS[item]) {
      console.warn(`⚠️  Unknown root directory: ${item}`);
    }
  });
  
  // Validate services structure
  const servicesPath = './services';
  if (fs.existsSync(servicesPath)) {
    fs.readdirSync(servicesPath).forEach(service => {
      const srcPath = path.join(servicesPath, service, 'src');
      if (!fs.existsSync(srcPath)) {
        console.error(`❌ ${service} missing /src directory`);
        hasErrors = true;
      }
      
      const prismaPath = path.join(servicesPath, service, 'prisma');
      if (!fs.existsSync(prismaPath)) {
        console.warn(`⚠️  ${service} missing /prisma directory`);
      }
    });
  }
  
  // Validate packages structure
  const packagesPath = './packages';
  if (fs.existsSync(packagesPath)) {
    fs.readdirSync(packagesPath).forEach(pkg => {
      const srcPath = path.join(packagesPath, pkg, 'src');
      const pkgJsonPath = path.join(packagesPath, pkg, 'package.json');
      
      if (!fs.existsSync(srcPath)) {
        console.error(`❌ ${pkg} package missing /src directory`);
        hasErrors = true;
      }
      
      if (!fs.existsSync(pkgJsonPath)) {
        console.error(`❌ ${pkg} package missing package.json`);
        hasErrors = true;
      }
    });
  }
  
  console.log();
  if (hasErrors) {
    console.error('❌ Structure validation FAILED');
    process.exit(1);
  } else {
    console.log('✅ Structure validation PASSED');
    process.exit(0);
  }
}

validateStructure();
```

---

## Quick Reference: File Location by Type

| File Type | Location Pattern | Example |
|-----------|------------------|---------|
| API Controller | `services/*/src/modules/*/interfaces/http/controllers/` | `user.controller.ts` |
| Use Case | `services/*/src/modules/*/application/use-cases/` | `create-user.use-case.ts` |
| Repository | `services/*/src/modules/*/infrastructure/repositories/` | `user.repository.ts` |
| Entity | `services/*/src/modules/*/domain/entities/` | `user.entity.ts` |
| Enum | `services/*/src/modules/*/domain/enums/` | `user-status.enum.ts` |
| DTO | `services/*/src/modules/*/application/dto/` | `create-user.dto.ts` |
| Validator | `packages/utils/src/validators/` | `email.validator.ts` |
| Formatter | `packages/utils/src/formatters/` | `date.formatter.ts` |
| Constants | `packages/constants/src/` | `error-messages.ts` |
| Types | `packages/types/src/` | `user.type.ts` |
| Config | `packages/config/src/` | `environment.ts` |
| Script | `scripts/[purpose]/` | `automation/split-barrel-exports.js` |

This ensures consistency and makes it easy for developers to locate files by their purpose.

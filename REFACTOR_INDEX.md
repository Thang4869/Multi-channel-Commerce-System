# 📚 Monorepo Refactor - Complete Documentation Index

**Status:** ✅ Ready for Implementation  
**Last Updated:** 2026-04-26  
**Owner:** Engineering Team

---

## 🎯 Start Here

If you're new to this refactor, follow this order:

1. **[REFACTOR_PLAN.md](./REFACTOR_PLAN.md)** ← **START HERE**
   - Overall vision and objectives
   - 7-phase migration plan
   - Success criteria checklist

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)**
   - System design and principles
   - Service-to-service communication patterns
   - Technology stack overview

3. **[CLAUDE.md](./CLAUDE.md)**
   - Code conventions and naming rules
   - Folder structure standards
   - Forbidden patterns and best practices

4. **[FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md)**
   - Exact file paths (old → new)
   - Import path changes needed
   - Per-file migration instructions

5. **[CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md)**
   - Configuration file examples
   - ESLint rules for enforcement
   - Package.json templates

---

## 📖 Documentation Overview

### Phase-Based Planning

#### 🟢 Phase 1: Setup Infrastructure (START HERE)
**Duration:** 2-3 hours  
**Document:** [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-1-setup-infrastructure)

Steps:
1. Create `packages/` folder structure
2. Move `shared/types` → `packages/types/`
3. Create package.json for each package
4. Update root package.json workspaces
5. Move `split_index.js` → `scripts/automation/`

**Checklist:**
- [ ] Create packages/{types,utils,constants,config}/src
- [ ] Move files to new locations
- [ ] Update tsconfig.json with path aliases
- [ ] Run `yarn install` and verify no errors

---

#### 🟡 Phase 2: Database Refactor
**Duration:** 3-4 hours  
**Document:** [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-2-database-refactor)

**Decision Needed:** Shared DB or Per-Service DB?

**Option A:** Shared Database (Current)
```
Move: prisma/ → packages/database/prisma/
```

**Option B:** Per-Service DB (Recommended)
```
Move: prisma/ → services/[service]/prisma/
      Split schemas by service
```

**Recommendation:** Option B for true microservices architecture

---

#### 🟡 Phase 3: Service Refactor
**Duration:** 4-6 hours  
**Document:** [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-3-service-refactor)

Each service should have exact structure:
```
services/[service]/src/
├── modules/[feature]/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── interfaces/
├── common/
├── config/
└── main.ts
```

**Services to refactor:**
- [ ] auth-service
- [ ] order-service
- [ ] (future services)

---

#### 🟢 Phase 4: Packages Setup
**Duration:** 2 hours  
**Document:** [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-4-packages-setup)

Create shared packages:
- [ ] `packages/types/` (already exists)
- [ ] `packages/utils/` (new)
- [ ] `packages/constants/` (new)
- [ ] `packages/config/` (new)

Each package has:
```
packages/[name]/
├── src/
├── tests/
├── package.json
└── tsconfig.json
```

**Package Templates:** [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#8-service-packagejson-template)

---

#### 🔵 Phase 5: Import Paths Update
**Duration:** 2-3 hours  
**Document:** [FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md#-import-path-changes)

**Update all imports:**

BEFORE:
```typescript
import { User } from '../../shared/types';
import { validateEmail } from '../../../../utils/validators';
```

AFTER:
```typescript
import { User } from '@types';
import { validateEmail } from '@utils/validators';
```

**tsconfig.json paths:** [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#1-root-tsconfigjson-complete)

---

#### 🟣 Phase 6: Linting & Validation
**Duration:** 2 hours  
**Document:** [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#2-root-eslintrc-json-complete)

Set up enforcement rules:
- [ ] ESLint for naming conventions
- [ ] ESLint for folder structure
- [ ] tsconfig for strict types
- [ ] Pre-commit hooks

Run validation:
```bash
yarn lint
yarn build
yarn test
node scripts/automation/validate-structure.js
```

---

#### 🟢 Phase 7: Documentation & Cleanup
**Duration:** 1-2 hours  
**Document:** [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-3-documentation--validation)

Update all documentation:
- [ ] README.md (new structure)
- [ ] ARCHITECTURE.md (system design)
- [ ] CLAUDE.md (conventions)
- [ ] API documentation
- [ ] Developer setup guide
- [ ] CI/CD pipelines

---

## 📋 File Migration Reference

### Quick Mapping Table

| Type | Old Location | New Location | Notes |
|------|-------------|-------------|-------|
| Types Package | `shared/types/` | `packages/types/` | Rename folder |
| Utils Package | — | `packages/utils/` | Create new |
| Constants Package | — | `packages/constants/` | Create new |
| Config Package | — | `packages/config/` | Create new |
| Automation Script | `split_index.js` | `scripts/automation/split-barrel-exports.js` | Move + rename |
| Database Schema | `prisma/` (root) | `services/*/prisma/` | Split per service |
| Prompts | `prompts/` | `scripts/prompts/` | Clarify purpose |

**Full Details:** [FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md#-complete-file-mapping)

---

## 🎓 By Role: What to Read

### For Project Manager / Tech Lead
1. [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) - Overview + Timeline
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - System design principles
3. [REFACTOR_PLAN.md#-success-criteria](./REFACTOR_PLAN.md#-success-criteria) - Checklist

### For Backend Developer
1. [CLAUDE.md](./CLAUDE.md) - Code conventions (essential!)
2. [ARCHITECTURE.md](./ARCHITECTURE.md#-service-architecture) - Service structure
3. [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-3-service-refactor) - Refactoring steps
4. [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md) - Configuration setup

### For Frontend Developer
1. [CLAUDE.md](./CLAUDE.md) - Naming + structure conventions
2. [ARCHITECTURE.md](./ARCHITECTURE.md#-technology-stack) - Tech stack overview
3. [FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md#-import-path-changes) - Import paths

### For DevOps Engineer
1. [ARCHITECTURE.md](./ARCHITECTURE.md#-deployment-model) - Deployment strategy
2. [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#6-github-actions-workflow) - CI/CD setup
3. [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#5-docker-build-per-service) - Docker builds

### For New Team Member (Onboarding)
1. [CLAUDE.md](./CLAUDE.md) - Start here for conventions
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the system
3. [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#-tips-for-long-term-maintenance) - Maintenance tips

---

## 🔧 Configuration Files Checklist

### Root Level Files to Create/Update

| File | Purpose | Reference |
|------|---------|-----------|
| `tsconfig.json` | TypeScript config with path aliases | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#1-root-tsconfigjson-complete) |
| `.eslintrc.json` | ESLint rules for enforcement | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#2-root-eslintrc-json-complete) |
| `.prettierrc.json` | Code formatting | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#3-prettierrcjson) |
| `package.json` | Update workspaces | [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#phase-1-setup-infrastructure) |
| `ARCHITECTURE.md` | System design (this file) | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| `CLAUDE.md` | Development conventions | [CLAUDE.md](./CLAUDE.md) |

### Per-Service Files

| File | Template | Reference |
|------|----------|-----------|
| `package.json` | Service template | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#8-service-packagejson-template) |
| `tsconfig.json` | Extends root | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#1-root-tsconfigjson-complete) |
| `Dockerfile` | Per-service build | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#5-docker-build-per-service) |

### Per-Package Files

| File | Template | Reference |
|------|----------|-----------|
| `package.json` | Package template | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#-new-package-templates) |
| `tsconfig.json` | Extends root | [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#1-root-tsconfigjson-complete) |
| `README.md` | Document package | [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) |

---

## 🚨 Critical Rules to Remember

### ✅ DO

- ✅ Use `@` path aliases for all imports
- ✅ Keep folder structure consistent
- ✅ One class per file
- ✅ Use Barrel exports (index.ts)
- ✅ Follow naming conventions strictly
- ✅ Implement proper error handling

### ❌ DON'T

- ❌ Import between services directly
- ❌ Use relative paths with `../../../`
- ❌ Create generic files (`utils.ts`, `helpers.ts`)
- ❌ Mix concerns in one file
- ❌ Use console.log (use logger instead)
- ❌ Put business logic in controllers

**Full Details:** [CLAUDE.md](./CLAUDE.md#-forbidden-patterns)

---

## 🔍 Verification Scripts

### Run Before Committing

```bash
# Type check
yarn workspaces run type-check

# Lint
yarn lint

# Build
yarn build

# Test
yarn test

# Validate structure
node scripts/automation/validate-structure.js
```

**Script Details:** [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md#8-validation-script)

---

## 🎯 Weekly Milestones

### Week 1: Foundation
- [ ] Phase 1: Setup packages structure
- [ ] Phase 2: Decide database strategy
- [ ] All imports updated to use aliases
- [ ] Root config files created

### Week 2: Services
- [ ] Phase 3: Services refactor complete
- [ ] Phase 4: All packages created
- [ ] Import paths all working
- [ ] All tests passing

### Week 3: Polish
- [ ] Phase 5: ESLint rules configured
- [ ] Phase 6: Documentation complete
- [ ] Phase 7: CI/CD pipelines updated
- [ ] Demo to team

---

## 💾 Backup Strategy Before Refactor

```bash
# 1. Create backup branch
git checkout -B refactor-backup

# 2. Commit current state
git add -A
git commit -m "backup: pre-refactor state"

# 3. Create feature branch for refactor
git checkout -b refactor/monorepo-structure

# 4. Start refactoring on this branch
# 5. Push to remote for safety
git push origin refactor/monorepo-structure
```

---

## 🆘 Troubleshooting

### Issue: `Cannot find module '@types'`

**Solution:** 
1. Check `tsconfig.json` has correct paths
2. Run `yarn install`
3. Clear `.tsbuildinfo` files
4. Restart IDE

### Issue: ESLint errors about imports

**Solution:**
1. Verify all imports use `@` aliases
2. Check `paths` in `tsconfig.json`
3. Run `yarn lint --fix` to auto-fix
4. See [CLAUDE.md](./CLAUDE.md#-import-path-rules)

### Issue: Package.json workspaces not recognized

**Solution:**
1. Ensure all `package.json` files exist
2. Check `root package.json` workspaces array
3. Run `yarn workspaces list` to verify
4. Run `yarn install` from root

### Issue: Tests failing after refactor

**Solution:**
1. Check import paths are updated
2. Verify path aliases work: `yarn type-check`
3. Clear test cache: `yarn test --clearCache`
4. Run tests with verbose: `yarn test --verbose`

---

## 📞 Need Help?

### Where to Ask Questions

| Question | Channel | Reference |
|----------|---------|-----------|
| How to name files? | Code Review | [CLAUDE.md](./CLAUDE.md#naming-conventions) |
| Folder structure? | PR Comments | [CLAUDE.md](./CLAUDE.md#folder-structure-convention) |
| Import paths? | Issue Discussion | [FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md#-import-path-configuration) |
| Architecture decisions? | Team Meeting | [ARCHITECTURE.md](./ARCHITECTURE.md#-architecture-principles) |
| Refactor timeline? | Project Manager | [REFACTOR_PLAN.md](./REFACTOR_PLAN.md#-checklist-refactor-steps) |

---

## 📚 Related Resources

### Internal Documents
- [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) - Detailed migration plan
- [FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md) - File-by-file mapping
- [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md) - Configuration examples
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [CLAUDE.md](./CLAUDE.md) - Code conventions

### External Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Monorepo Best Practices](https://turbo.build/repo/docs)

---

## ✅ Sign-Off Checklist

Before starting refactor, ensure:

- [ ] All team members have read this document
- [ ] REFACTOR_PLAN.md reviewed and approved
- [ ] Database strategy decided (shared vs. per-service)
- [ ] Backup branch created
- [ ] No active deployments scheduled during refactor
- [ ] Communication plan to team
- [ ] Risk mitigation strategy in place

---

## 🚀 Success Criteria

After refactor is complete:

- ✅ All code builds without errors
- ✅ All tests pass
- ✅ ESLint passes with 0 warnings
- ✅ Import paths use `@` aliases exclusively
- ✅ No circular dependencies
- ✅ CI/CD pipelines updated and passing
- ✅ Documentation complete and accurate
- ✅ Team trained on new conventions
- ✅ New services can be added following template
- ✅ Performance metrics unchanged or improved

---

**Version:** 2.0  
**Status:** Ready for Implementation  
**Last Updated:** 2026-04-26  
**Next Review:** After Phase 1 completion

---

## 🎉 Let's Go!

Start with [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) **Phase 1** and follow the checklist.

Good luck! 🚀

# 📋 CLAUDE.md - Project Conventions & Development Guidelines

**Version:** 2.0  
**Last Updated:** 2026-04-26  
**Audience:** All developers

---

## 🎯 Quick Reference

This file documents conventions and best practices for the Multi-Channel Commerce System monorepo.

### When to Use This File

- **Before writing code**: Check naming conventions
- **Before committing**: Verify code follows guidelines
- **When joining the team**: Learn project standards
- **When adding new features**: Follow the patterns

---

## 📁 Folder Structure Convention

### Root Level - ONLY These Folders Allowed

```
✅ ALLOWED:
- apps/           → Frontend applications
- services/       → Backend microservices
- packages/       → Shared code
- database/       → Database configs (optional)
- infrastructure/ → DevOps configs
- scripts/        → Automation scripts
- docs/           → Documentation
- tools/          → Dev tools (eslint, etc)
- .github/        → CI/CD workflows
- .vscode/        → IDE config

❌ FORBIDDEN:
- shared/         → Use packages/ instead
- utils/          → Use packages/utils/
- helpers/        → Use packages/utils/helpers/
- common/         → Use packages/constants/ or packages/config/
- src/            → This is a monorepo, not a single project
```

### Services Folder Convention

```
services/[service-name]/
├── src/
│   ├── modules/              ← Feature modules (auth, user, etc)
│   │   ├── [feature-a]/
│   │   │   ├── application/  ← Use cases, DTOs
│   │   │   ├── domain/       ← Entities, business logic
│   │   │   ├── infrastructure/ ← Data access, services
│   │   │   ├── interfaces/   ← HTTP controllers
│   │   │   └── [feature].module.ts
│   │   └── [feature-b]/...
│   ├── common/               ← Shared within service
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── middleware/
│   │   ├── pipes/
│   │   └── index.ts
│   ├── config/               ← Service config
│   │   ├── environment.ts
│   │   ├── database.config.ts
│   │   └── index.ts
│   ├── app.module.ts         ← Root module
│   └── main.ts               ← Bootstrap entry point
├── prisma/                    ← Service-specific DB schema
│   ├── schema.prisma
│   └── migrations/
├── tests/                     ← Tests organized by layer
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── Dockerfile
├── docker-compose.test.yml
├── package.json
├── tsconfig.json
└── README.md
```

### Packages Folder Convention

```
packages/[package-name]/
├── src/
│   ├── [domain]/              ← Logical grouping
│   │   └── *.ts              ← Implementation files
│   └── index.ts              ← Barrel export (IMPORTANT!)
├── tests/
│   └── [package-name].spec.ts
├── package.json              ← Must export from src/
├── tsconfig.json             ← Extends root tsconfig
└── README.md
```

### Scripts Folder Convention

```
scripts/
├── automation/                ← Automation scripts
│   ├── split-barrel-exports.js
│   ├── generate-api-docs.js
│   └── validate-structure.js
├── database/                  ← Database scripts
│   ├── seed.ts
│   └── reset.sh
├── deployment/                ← Deployment scripts
│   ├── build-images.sh
│   └── push-registry.sh
├── testing/                   ← Testing utilities
│   └── run-e2e.sh
└── README.md                  ← Document each script
```

---

## 📝 Naming Conventions

### Files

**Pattern Format: `[name].[type].[suffix].ts`**

```typescript
// Controllers
user.controller.ts              // HTTP route handlers
auth.controller.ts

// Services (Infrastructure)
hash.service.impl.ts            // Implementation (add .impl if interface exists)
jwt.service.impl.ts
email.service.impl.ts

// Services (Abstract)
hash.service.ts                 // Interface/Abstract class
jwt.service.ts

// Use Cases
create-user.use-case.ts         // Business logic operations
login.use-case.ts
refresh-token.use-case.ts

// Repositories
user.repository.ts              // Data access abstraction
token.repository.ts

// DTOs (Data Transfer Objects)
create-user.dto.ts              // Request/Response models
login-request.dto.ts
user-response.dto.ts

// Entities
user.entity.ts                  // Domain entities
order.entity.ts

// Enums
user-status.enum.ts             // Enumerated values
order-status.enum.ts
user-role.enum.ts

// Guards
auth.guard.ts                   // Route guards
jwt-auth.guard.ts
role.guard.ts

// Middleware
logger.middleware.ts            // Express middleware
error-handler.middleware.ts

// Pipes (Validation)
validation.pipe.ts              // Input transformation
parse-int.pipe.ts

// Filters (Exception Handling)
http-exception.filter.ts        // Exception handlers
validation-error.filter.ts

// Decorators
auth-user.decorator.ts          // Custom decorators
require-role.decorator.ts

// Utilities (in packages/utils)
date.formatter.ts               // Utility functions
email.validator.ts
password.validator.ts
object.transformer.ts

// Tests
user.controller.spec.ts         // Unit tests
create-user.use-case.spec.ts
user.service.spec.ts

// Others
*.config.ts                     // Configuration files
*.constant.ts                   // Constants (or use packages/constants)
*.type.ts                       // Type definitions (or use packages/types)
*.interface.ts                  // Interfaces (usually in service folders)
```

### Naming Patterns - What NOT to Do

```typescript
// ❌ BAD - Too generic
utils.ts
helpers.ts
common.ts
index.ts (as a service/logic file)
service.ts (which service?)
repository.ts (which repository?)

// ✅ GOOD - Specific
date-formatter.util.ts
string.helper.ts
auth-constants.ts
user-service.impl.ts
user.repository.ts
```

### Directories

**Always use kebab-case:**

```typescript
✅ GOOD:
- services/auth-service/
- services/order-service/
- modules/user-management/
- modules/order-processing/
- use-cases/

❌ BAD:
- services/authService/
- services/OrderService/
- modules/userManagement/
- usesCases/
```

### Classes and Types

**Always use PascalCase:**

```typescript
// ✅ GOOD
class CreateUserUseCase {}
class UserRepository {}
interface UserService {}
type UserDTO = {}
enum UserRole {}

// ❌ BAD
class createUserUseCase {}
class user_repository {}
interface userService {}
type user_dto = {}
enum user_role {}
```

### Variables and Functions

**Always use camelCase:**

```typescript
// ✅ GOOD
const userId = '123';
const userEmail = 'user@example.com';
function validateEmail(email: string) {}
const MAX_RETRIES = 3;

// ❌ BAD
const user_id = '123';
const UserEmail = 'user@example.com';
function validate_email(email: string) {}
```

---

## 🏗️ Code Organization Rules

### Rule 1: One Class Per File

```typescript
// ✅ GOOD - create-user.use-case.ts
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  execute(command: CreateUserCommand): Promise<User> {
    // Implementation
  }
}

// ❌ BAD - user.ts (multiple unrelated classes)
export class CreateUserUseCase {}
export class UpdateUserUseCase {}
export class DeleteUserUseCase {}
```

### Rule 2: Barrel Exports (index.ts) for Clean Imports

```typescript
// ✅ GOOD - application/use-cases/index.ts
export * from './create-user.use-case';
export * from './login.use-case';
export * from './refresh-token.use-case';

// ✅ Usage:
import { CreateUserUseCase, LoginUseCase } from '@auth/modules/auth/application/use-cases';

// ❌ BAD - No barrel export
import { CreateUserUseCase } from '@auth/modules/auth/application/use-cases/create-user.use-case';
import { LoginUseCase } from '@auth/modules/auth/application/use-cases/login/login.use-case';
```

### Rule 3: Organize by Layer, Not by Type

```typescript
// ✅ GOOD - Organized by layer
services/auth-service/
├── src/modules/auth/
│   ├── application/
│   │   ├── use-cases/
│   │   │   ├── login.use-case.ts
│   │   │   ├── register.use-case.ts
│   │   │   └── index.ts
│   │   └── dto/
│   ├── domain/
│   │   ├── entities/
│   │   ├── enums/
│   │   └── exceptions/
│   ├── infrastructure/
│   │   ├── repositories/
│   │   └── services/
│   └── interfaces/
│       └── http/

// ❌ BAD - Organized by type (not DDD)
services/auth-service/
├── src/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── token.entity.ts
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   ├── token.repository.ts
│   ├── use-cases/
│   │   ├── login.use-case.ts
│   │   ├── register.use-case.ts
│   ├── controllers/
│   │   └── auth.controller.ts
```

### Rule 4: No Default Exports (Use Named Exports)

```typescript
// ✅ GOOD
export class UserService {}
export const USER_ROLES = [...]

import { UserService, USER_ROLES } from '@auth/modules/auth/...'

// ❌ BAD
export default class UserService {}
export default { UserService, USER_ROLES }

import UserService from '@auth/modules/auth/...'
```

### Rule 5: Index.ts Files - Barrel Exports Only

```typescript
// ✅ GOOD - application/use-cases/index.ts
export * from './create-user.use-case';
export * from './login.use-case';
export * from './refresh-token.use-case';

// ❌ BAD - Logic in index.ts
export class CreateUserUseCase {
  // Implementation in index.ts - WRONG!
}

// ❌ BAD - Re-exporting with aliases
export { CreateUserUseCase as UserCreator } from './create-user.use-case';
```

---

## 🔄 Import Path Rules

### Use Path Aliases (tsconfig paths)

```typescript
// ✅ GOOD - Using aliases
import { CreateUserUseCase } from '@auth/modules/auth/application/use-cases';
import { validateEmail } from '@utils/validators';
import { AUTH_ERRORS } from '@constants/errors';
import { User } from '@types/auth';

// ❌ BAD - Relative paths
import { CreateUserUseCase } from '../../../../modules/auth/application/use-cases';
import validateEmail from '../../../../../packages/utils/src/validators/email';
```

### Import Order (Keep Imports Organized)

```typescript
// ✅ GOOD - Organized import order
// 1. External libraries
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

// 2. Shared packages
import { validateEmail } from '@utils/validators';
import { AUTH_ERRORS } from '@constants/errors';
import type { UserDTO } from '@types/auth';

// 3. Service modules
import { UserRepository } from '../repositories/user.repository';
import { HashService } from '../services/hash.service.impl';

// 4. Relative imports (if needed)
import { CreateUserDto } from './dto/create-user.dto';
```

### Service-to-Service Communication

```typescript
// ❌ FORBIDDEN - Direct service imports
import { AuthService } from '@auth/infrastructure/services';

// ✅ ALLOWED - HTTP/REST calls
const response = await fetch('http://auth-service:3001/api/verify', {
  method: 'GET',
  headers: { Authorization: `Bearer ${token}` }
});

// ✅ ALLOWED - Event-based communication
eventBus.emit('order.created', { orderId: '123', userId: '456' });
```

---

## 🧪 Testing Conventions

### Test File Naming

```typescript
// Unit tests
user.controller.spec.ts
create-user.use-case.spec.ts
user.repository.spec.ts

// Integration tests
auth.integration.spec.ts
user-creation.integration.spec.ts

// E2E tests
auth.e2e-spec.ts
order-creation.e2e-spec.ts
```

### Test Organization

```typescript
// ✅ GOOD - Clear test structure
describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepository;

  beforeEach(() => {
    // Setup
  });

  describe('execute', () => {
    it('should create a new user', async () => {
      // Arrange
      const command = { email: 'test@example.com', password: 'password' };
      
      // Act
      const result = await createUserUseCase.execute(command);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw error if email already exists', async () => {
      // Test error case
    });
  });
});
```

---

## 🐛 Logging Conventions

### Log Levels

```typescript
// TRACE - Most detailed (development only)
logger.debug('User object:', user);

// DEBUG - Detailed info for debugging
logger.debug('Starting order creation flow');

// INFO - Important business events
logger.info('User login successful', { userId: '123', timestamp: new Date() });

// WARN - Potential issues
logger.warn('Token expiring soon', { userId: '123', expiresIn: '1h' });

// ERROR - System failures (recoverable)
logger.error('Failed to save user', { error: err.message });

// FATAL - Critical failures (unrecoverable)
logger.error('Database connection lost', { error: err });
```

### Structured Logging Format

```typescript
// ✅ GOOD - Structured, JSON-friendly
logger.info('order.created', {
  orderId: '123',
  userId: '456',
  totalAmount: 99.99,
  itemCount: 3,
  timestamp: new Date().toISOString()
});

// ❌ BAD - Unstructured string
logger.info(`Order 123 created by user 456 for $99.99`);
```

---

## 📊 Git Conventions

### Branch Naming

```
feat/[feature-name]           - New feature
fix/[bug-name]               - Bug fix
refactor/[area]              - Code refactoring
docs/[topic]                 - Documentation
perf/[optimization]          - Performance improvement
test/[coverage]              - Test additions
chore/[task]                 - Maintenance tasks

Examples:
- feat/user-authentication
- fix/token-verification-error
- refactor/service-layer
- docs/api-documentation
- perf/database-queries
```

### Commit Messages

```
feat: add user authentication with JWT

Implement JWT-based authentication for the auth service.
- Add login endpoint
- Add register endpoint
- Add token refresh logic

Closes #123
```

**Format: `[type]: [subject]`**

Types: `feat`, `fix`, `refactor`, `docs`, `perf`, `test`, `chore`

### Pull Requests

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows conventions
- [ ] No linting errors
- [ ] Tests pass
- [ ] Documentation updated
```

---

## 🚫 Forbidden Patterns

### ❌ Direct Service Imports Between Microservices

```typescript
// FORBIDDEN
import { AuthService } from '@auth/infrastructure/services';

// USE INSTEAD
const isValid = await fetch(`${AUTH_SERVICE_URL}/verify`, {
  method: 'POST',
  body: JSON.stringify({ token })
});
```

### ❌ Environment Variables Without Validation

```typescript
// ❌ BAD
const dbUrl = process.env.DATABASE_URL;

// ✅ GOOD - Use validated config
import { configService } from '@config';
const dbUrl = configService.get('DATABASE_URL');
```

### ❌ Console Logs in Production

```typescript
// ❌ BAD
console.log('User logged in:', user);

// ✅ GOOD
logger.info('user.login', { userId: user.id });
```

### ❌ Magic Numbers/Strings

```typescript
// ❌ BAD
const maxRetries = 3;
if (attempts > 3) { /* ... */ }

// ✅ GOOD
const MAX_LOGIN_ATTEMPTS = 3;
import { MAX_LOGIN_ATTEMPTS } from '@constants/auth';

if (attempts > MAX_LOGIN_ATTEMPTS) { /* ... */ }
```

### ❌ Missing Error Handling

```typescript
// ❌ BAD
const user = await userRepository.findById(id);
const hashedPassword = user.password;

// ✅ GOOD
const user = await userRepository.findById(id);
if (!user) {
  throw new NotFoundException('User not found');
}
const hashedPassword = user.password;
```

### ❌ Mixing Concerns in One Function

```typescript
// ❌ BAD - HTTP, Business Logic, and Data Access mixed
@Post('/users')
async createUser(@Body() body) {
  const user = new User(body);
  
  const query = 'INSERT INTO users ...';
  const db = mysql.getConnection();
  const result = db.query(query);
  
  return result;
}

// ✅ GOOD - Separation of concerns
// Controller handles HTTP
@Post('/users')
async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
  const user = await this.createUserUseCase.execute(createUserDto);
  return user;
}

// Use Case handles business logic
@Injectable()
export class CreateUserUseCase {
  async execute(command: CreateUserCommand): Promise<User> {
    const hashedPassword = await this.hashService.hash(command.password);
    const user = await this.userRepository.save({ ...command, password: hashedPassword });
    return user;
  }
}

// Repository handles data access
@Injectable()
export class UserRepository {
  async save(user: Partial<User>): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
}
```

---

## ✅ Approved Patterns & Best Practices

### ✅ Dependency Injection

```typescript
// Use NestJS's built-in DI
@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const hashedPassword = await this.hashService.hash(command.password);
    return this.userRepository.save({
      ...command,
      password: hashedPassword
    });
  }
}
```

### ✅ DTOs for Request/Response Validation

```typescript
// Request DTO
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/[A-Z]/, { message: 'Must contain uppercase letter' })
  password: string;
}

// Response DTO
export class UserResponseDto {
  id: string;
  email: string;
  createdAt: Date;
}
```

### ✅ Use Cases for Business Logic

```typescript
// Encapsulates business rules
@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private jwtService: JwtService
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(command.email);
    
    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.hashService.compare(
      command.password,
      user.passwordHash
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles
    });

    return { user, token };
  }
}
```

### ✅ Repositories for Data Access Abstraction

```typescript
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async save(user: Partial<User>): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
```

---

## 🔍 Code Review Checklist

Before submitting a PR, ensure:

- [ ] Naming follows conventions (files, classes, functions)
- [ ] Folder structure follows patterns
- [ ] No forbidden patterns used
- [ ] Tests added/updated
- [ ] No console.logs (use logger instead)
- [ ] No direct service imports between services
- [ ] DTOs used for request/response
- [ ] Error handling implemented
- [ ] Commit messages follow format
- [ ] README updated if needed
- [ ] ESLint passes: `yarn lint`
- [ ] TypeScript compiles: `yarn build`
- [ ] Tests pass: `yarn test`

---

## 🚀 Onboarding New Developer

1. Read this file (CLAUDE.md)
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Read [REFACTOR_PLAN.md](./REFACTOR_PLAN.md)
4. Set up local environment: `docker-compose up`
5. Create a test feature using [service template](./services/_template/)
6. Submit small PR for review
7. Ask questions in PRs - we're here to help!

---

## 📞 Questions or Suggestions?

- Found a pattern not in this guide? Open an issue.
- Disagree with a convention? Let's discuss in a PR.
- Need clarification? Ask in code review comments.

**Remember:** These conventions exist to make our codebase scalable, maintainable, and enjoyable for everyone. 🎉

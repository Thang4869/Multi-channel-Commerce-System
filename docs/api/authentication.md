# API Authentication & Authorization

> JWT tokens, RBAC, and access control

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [JWT Authentication](#jwt-authentication)
3. [Access Control](#access-control)
4. [Login Flow](#login-flow)
5. [Token Management](#token-management)
6. [Examples](#examples)

---

## Overview

The system uses **JWT (JSON Web Tokens)** for authentication and **RBAC (Role-Based Access Control)** for authorization.

### Key Concepts

- **Authentication**: Verify who you are (login)
- **Authorization**: Determine what you can access (roles/permissions)
- **JWT Token**: Stateless, self-contained credential
- **Roles**: Admin, Manager, Customer, Shipper, etc.

---

## JWT Authentication

### Token Structure

JWT consists of 3 parts separated by dots:

```
header.payload.signature
```

**Example**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJ1c3J-MTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Token Claims

```json
{
  "sub": "usr-123",           // User ID
  "email": "user@example.com",
  "roles": ["CUSTOMER"],
  "iat": 1516239022,          // Issued at
  "exp": 1516242622,          // Expiration
  "aud": "api.commerce.local"
}
```

### Token Expiration

- **Access Token**: 15 minutes
- **Refresh Token**: 7 days

---

## Access Control

### User Roles

| Role | Description | Permissions |
|------|-------------|------------|
| **ADMIN** | System administrator | All operations |
| **WAREHOUSE_MANAGER** | Warehouse operations | Manage inventory, warehouse |
| **STORE_MANAGER** | Store operations | Manage store, products |
| **SHIPPER** | Delivery personnel | View & update deliveries |
| **CUSTOMER** | Customer | Browse, order, track |

### Role Hierarchy

```
ADMIN (highest)
  └─ WAREHOUSE_MANAGER
  └─ STORE_MANAGER
  └─ SHIPPER
  └─ CUSTOMER (lowest)
```

### Permission Model

Permissions are tied to roles:

```typescript
const permissions = {
  ADMIN: ['*'],                    // All permissions
  WAREHOUSE_MANAGER: [
    'inventory:read',
    'inventory:write',
    'warehouse:read',
    'warehouse:write'
  ],
  STORE_MANAGER: [
    'products:read',
    'products:write',
    'orders:read'
  ],
  SHIPPER: [
    'deliveries:read',
    'deliveries:write'
  ],
  CUSTOMER: [
    'orders:create',
    'orders:read',
    'profile:read'
  ]
};
```

---

## Login Flow

### Step 1: Submit Credentials

**Request**:
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Step 2: Server Validates

1. Find user by email
2. Verify password (bcrypt)
3. Check if account is active
4. Generate tokens

### Step 3: Receive Tokens

**Response**:
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "usr-123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "roles": ["CUSTOMER"]
    }
  }
}
```

### Step 4: Store Tokens

```javascript
// In browser/mobile app
localStorage.setItem('accessToken', response.data.accessToken);
localStorage.setItem('refreshToken', response.data.refreshToken);
```

---

## Token Management

### Using Access Token

Include in all subsequent requests:

```bash
GET /api/orders
Authorization: Bearer eyJhbGc...
```

### Refresh Token (When Access Token Expires)

**Request**:
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response**:
```json
{
  "accessToken": "eyJhbGc... (new)",
  "refreshToken": "eyJhbGc... (rotated)"
}
```

### Logout

```bash
POST /api/auth/logout
Authorization: Bearer eyJhbGc...
```

Invalidates refresh token on server.

---

## Examples

### Example 1: Login with cURL

```bash
# Step 1: Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr-1",
    "email": "admin@example.com",
    "roles": ["ADMIN"]
  }
}

# Step 2: Use token to access protected endpoint
curl -X GET http://localhost:3001/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Response:
{
  "id": "usr-1",
  "email": "admin@example.com",
  "fullName": "Admin User",
  "roles": ["ADMIN"]
}
```

### Example 2: TypeScript Client

```typescript
// api-client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// Handle token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await apiClient.post('/auth/refresh', {
        refreshToken
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      // Retry original request
      return apiClient(error.config);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Example 3: Protected Route (Next.js)

```typescript
// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default async function DashboardPage() {
  try {
    const token = cookies().get('accessToken')?.value;
    
    if (!token) {
      redirect('/login');
    }
    
    const response = await apiClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const user = response.data;
    
    // Check role
    if (!user.roles.includes('ADMIN')) {
      redirect('/unauthorized');
    }
    
    return <div>Dashboard for {user.fullName}</div>;
  } catch (error) {
    redirect('/login');
  }
}
```

---

## Security Best Practices

### ✅ DO

- ✅ Use HTTPS in production
- ✅ Store refresh token securely (httpOnly cookie or secure storage)
- ✅ Validate tokens on every request
- ✅ Use short-lived access tokens
- ✅ Rotate refresh tokens
- ✅ Log security events

### ❌ DON'T

- ❌ Store tokens in localStorage (XSS vulnerable)
- ❌ Send tokens in URL parameters
- ❌ Log sensitive data
- ❌ Use expired tokens
- ❌ Share tokens between users
- ❌ Hardcode secrets in code

---

## Troubleshooting

### Issue: "Invalid Token"
```
Check if:
- Token is not expired
- Token is copied correctly (no extra spaces)
- Authorization header format: "Bearer <token>"
```

### Issue: "Token Expired"
```
Solution:
- Refresh token using /auth/refresh endpoint
- Or login again
```

### Issue: "Unauthorized Access"
```
Check if:
- User has required role
- Token includes all necessary claims
- Endpoint permissions match user role
```

---

## References

- [IETF RFC 7519 - JWT](https://tools.ietf.org/html/rfc7519)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

**Version**: 1.0.0  
**Last Updated**: 2026-04-25  
**Endpoint**: POST /api/auth/login

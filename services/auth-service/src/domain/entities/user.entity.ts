// ============================================
// DOMAIN - ENTITIES
// ============================================

import { UserRole } from '@commerce/types';

export class User {
  id!: string;
  email!: string;
  password!: string;
  fullName!: string;
  phone!: string;
  roles!: UserRole[];
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  isValidPassword(encryptedPassword: string): boolean {
    // This will be handled by bcrypt in the application layer
    return true;
  }

  hasRole(role: UserRole): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: UserRole[]): boolean {
    return roles.some(role => this.roles.includes(role));
  }
}

export class RefreshToken {
  id!: string;
  userId!: string;
  token!: string;
  expiresAt!: Date;
  revokedAt?: Date;
  createdAt!: Date;

  constructor(data: Partial<RefreshToken>) {
    Object.assign(this, data);
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  isRevoked(): boolean {
    return !!this.revokedAt;
  }

  isValid(): boolean {
    return !this.isExpired() && !this.isRevoked();
  }
}

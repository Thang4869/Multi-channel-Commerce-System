// ============================================
// APPLICATION - INTERFACES
// ============================================

import { User } from '../../domain/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(userId: string, data: Partial<User>): Promise<User>;
  delete(userId: string): Promise<void>;
  findAll(page: number, limit: number): Promise<{ items: User[]; total: number }>;
  addRole(userId: string, role: string): Promise<User>;
  removeRole(userId: string, role: string): Promise<User>;
}

export interface ITokenRepository {
  saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>;
  findRefreshToken(token: string): Promise<{ userId: string; expiresAt: Date } | null>;
  revokeRefreshToken(token: string): Promise<void>;
  revokeAllRefreshTokens(userId: string): Promise<void>;
}

export interface IJwtService {
  generateAccessToken(userId: string, email: string, roles: string[]): string;
  generateRefreshToken(userId: string): string;
  verifyAccessToken(token: string): Promise<any>;
  verifyRefreshToken(token: string): Promise<any>;
}

export interface IHashService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export interface IAuthService {
  register(email: string, password: string, fullName: string, phone: string, role: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  refreshToken(token: string): Promise<any>;
  revokeToken(token: string): Promise<void>;
  validateUser(userId: string): Promise<User>;
  assignRole(userId: string, role: string): Promise<User>;
}

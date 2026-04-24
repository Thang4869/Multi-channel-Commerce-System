// ============================================
// APPLICATION - DTOs
// ============================================

import { UserRole } from '@commerce/types';

// ========== AUTH DTOs ==========
export class LoginDto {
  email!: string;
  password!: string;
}

export class RegisterDto {
  email!: string;
  password!: string;
  fullName!: string;
  phone!: string;
  role!: UserRole;
}

export class RefreshTokenDto {
  refreshToken!: string;
}

export class RevokeTokenDto {
  token!: string;
}

export class AssignRoleDto {
  userId!: string;
  role!: UserRole;
}

// ========== RESPONSE DTOs ==========
export class UserResponseDto {
  id!: string;
  email!: string;
  fullName!: string;
  phone!: string;
  roles!: UserRole[];
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class AuthResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: UserResponseDto;
}

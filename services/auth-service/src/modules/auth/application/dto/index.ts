// ============================================
// APPLICATION - DTOs
// ============================================

import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '@commerce/types';

// ========== AUTH DTOs ==========
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  fullName!: string;

  @IsString()
  phone!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class RevokeTokenDto {
  @IsString()
  token!: string;
}

export class AssignRoleDto {
  @IsString()
  userId!: string;

  @IsEnum(UserRole)
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

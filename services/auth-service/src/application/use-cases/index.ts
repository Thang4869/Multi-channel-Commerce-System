// ============================================
// APPLICATION - USE CASES
// ============================================

import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, IJwtService, IHashService, ITokenRepository } from '../interfaces';
import { UserRole } from '../../domain/enums';
import { AuthResponseDto, UserResponseDto } from '../dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
    private readonly hashService: IHashService,
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    const isPasswordValid = await this.hashService.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.generateAccessToken(
      user.id,
      user.email,
      user.roles,
    );

    const refreshToken = this.jwtService.generateRefreshToken(user.id);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.tokenRepository.saveRefreshToken(user.id, refreshToken, refreshTokenExpiry);

    return {
      accessToken,
      refreshToken,
      user: this.mapUserToDto(user),
    };
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService,
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: UserRole,
  ): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      phone,
      roles: [role],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);

    const accessToken = this.jwtService.generateAccessToken(
      createdUser.id,
      createdUser.email,
      createdUser.roles,
    );

    const refreshToken = this.jwtService.generateRefreshToken(createdUser.id);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepository.saveRefreshToken(createdUser.id, refreshToken, refreshTokenExpiry);

    return {
      accessToken,
      refreshToken,
      user: this.mapUserToDto(createdUser),
    };
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly tokenRepository: ITokenRepository,
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(refreshToken: string): Promise<AuthResponseDto> {
    const tokenData = await this.tokenRepository.findRefreshToken(refreshToken);
    if (!tokenData) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userRepository.findById(tokenData.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newAccessToken = this.jwtService.generateAccessToken(
      user.id,
      user.email,
      user.roles,
    );

    const newRefreshToken = this.jwtService.generateRefreshToken(user.id);
    const newRefreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepository.revokeRefreshToken(refreshToken);
    await this.tokenRepository.saveRefreshToken(user.id, newRefreshToken, newRefreshTokenExpiry);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: this.mapUserToDto(user),
    };
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

@Injectable()
export class AssignRoleUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, role: UserRole): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.addRole(userId, role);
    return this.mapUserToDto(updatedUser);
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

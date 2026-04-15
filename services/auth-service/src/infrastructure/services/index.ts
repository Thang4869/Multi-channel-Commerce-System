// ============================================
// INFRASTRUCTURE - SERVICES
// ============================================

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IJwtService, IHashService } from '../../application/interfaces';
import { UserRole } from '../../domain/enums';

@Injectable()
export class JwtServiceImpl implements IJwtService {
  private readonly accessTokenExpiry = '15m';
  private readonly refreshTokenExpiry = '7d';

  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(userId: string, email: string, roles: UserRole[]): string {
    return this.jwtService.sign(
      {
        userId,
        email,
        roles,
      },
      {
        expiresIn: this.accessTokenExpiry,
        secret: process.env.JWT_SECRET || 'your-secret-key',
      },
    );
  }

  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      {
        userId,
        type: 'REFRESH',
      },
      {
        expiresIn: this.refreshTokenExpiry,
        secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      },
    );
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      });
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      });
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}

@Injectable()
export class HashServiceImpl implements IHashService {
  private readonly rounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.rounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

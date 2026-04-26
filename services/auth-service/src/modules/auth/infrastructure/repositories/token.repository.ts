import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, ITokenRepository } from '../../application/interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: uuid(),
        userId,
        token,
        expiresAt,
      },
    });
  }

  async findRefreshToken(token: string): Promise<{ userId: string; expiresAt: Date } | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!refreshToken) {
      return null;
    }

    // Check if token is revoked or expired
    if (refreshToken.revokedAt || refreshToken.expiresAt < new Date()) {
      return null;
    }

    return {
      userId: refreshToken.userId,
      expiresAt: refreshToken.expiresAt,
    };
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllRefreshTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { revokedAt: new Date() },
    });
  }
}

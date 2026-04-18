// ============================================
// INFRASTRUCTURE - REPOSITORIES
// ============================================

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, ITokenRepository } from '../../application/interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        id: uuid(),
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        phone: user.phone,
        roles: user.roles,
        isActive: user.isActive,
      },
    });

    return new User(created);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? new User(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? new User(user) : null;
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    return new User(updated);
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findAll(page: number, limit: number): Promise<{ items: User[]; total: number }> {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return {
      items: users.map((u: any) => new User(u)),
      total,
    };
  }

  async addRole(userId: string, role: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.roles.includes(role as any)) {
      user.roles.push(role as any);

      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: { roles: user.roles },
      });

      return new User(updated);
    }

    return user;
  }

  async removeRole(userId: string, role: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.roles = user.roles.filter(r => r !== role);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { roles: user.roles },
    });

    return new User(updated);
  }
}

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

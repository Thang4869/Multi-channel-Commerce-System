import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '@commerce/types';
import { IUserRepository, ITokenRepository } from '../../application/interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: any) {}

  private mapUserRoles(roles: Array<string | UserRole>): UserRole[] {
    return roles.map((r) => r as UserRole);
  }

  private toDomainUser(user: any): User {
    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      phone: user.phone,
      roles: this.mapUserRoles(user.roles || []),
      isActive: !!user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

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

    return this.toDomainUser(created);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user ? this.toDomainUser(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.toDomainUser(user) : null;
  }

  async update(userId: string, data: Partial<User>): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    return this.toDomainUser(updated);
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
      items: users.map((u: any) => this.toDomainUser(u)),
      total,
    };
  }

  async addRole(userId: string, role: UserRole): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.roles.includes(role)) {
      user.roles.push(role);

      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: { roles: user.roles },
      });

      return this.toDomainUser(updated);
    }

    return user;
  }

  async removeRole(userId: string, role: UserRole): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.roles = user.roles.filter((r) => r !== role);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { roles: user.roles },
    });

    return this.toDomainUser(updated);
  }
}

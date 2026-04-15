// ============================================
// AUTH SERVICE MODULE
// ============================================

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './interfaces/http/controllers/auth.controller';
import { JwtStrategy } from './interfaces/http/strategies/jwt.strategy';
import { JwtAuthGuard, RolesGuard } from './interfaces/http/guards/auth.guard';
import { LoginUseCase, RegisterUseCase, RefreshTokenUseCase, AssignRoleUseCase } from './application/use-cases';
import { UserRepository, TokenRepository } from './infrastructure/repositories';
import { JwtServiceImpl, HashServiceImpl } from './infrastructure/services';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
    PassportModule,
  ],
  providers: [
    // Entities
    PrismaClient,

    // Repositories
    {
      provide: 'IUserRepository',
      useValue: new UserRepository(prismaClient),
    },
    {
      provide: 'ITokenRepository',
      useValue: new TokenRepository(prismaClient),
    },

    // Services
    {
      provide: 'IJwtService',
      useClass: JwtServiceImpl,
    },
    {
      provide: 'IHashService',
      useClass: HashServiceImpl,
    },

    // Use Cases
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    AssignRoleUseCase,

    // Guards & Strategies
    JwtAuthGuard,
    RolesGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    'IJwtService',
    'IUserRepository',
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}

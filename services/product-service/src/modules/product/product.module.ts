import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { ProductController } from './interfaces/http/controllers/product.controller';
import { JwtStrategy } from './interfaces/http/strategies/jwt.strategy';
import { ProductRepository } from './infrastructure/repositories/product.repository';
import { ProductService } from './application/use-cases/product.service';

const prismaClient = new PrismaClient();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
    }),
    PassportModule,
  ],
  providers: [
    PrismaClient,
    {
      provide: 'IProductRepository',
      useValue: new ProductRepository(prismaClient),
    },
    ProductService,
    JwtStrategy,
  ],
  controllers: [ProductController],
})
export class ProductModule {}

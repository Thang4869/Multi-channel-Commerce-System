// ============================================
// PRODUCT SERVICE MODULE
// ============================================

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { ProductController } from './interfaces/http/controllers/product.controller';
import { CategoryController } from './interfaces/http/controllers/category.controller';
import { BrandController } from './interfaces/http/controllers/brand.controller';
import { JwtStrategy } from './interfaces/http/strategies/jwt.strategy';
import {
  CreateProductUseCase,
  GetProductUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  CreateCategoryUseCase,
  GetCategoryUseCase,
  GetCategoriesUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
  CreateBrandUseCase,
  GetBrandUseCase,
  GetBrandsUseCase,
  UpdateBrandUseCase,
  DeleteBrandUseCase,
} from './application/use-cases';
import {
  ProductRepository,
  CategoryRepository,
  BrandRepository,
} from './infrastructure/repositories';

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
    {
      provide: 'ICategoryRepository',
      useValue: new CategoryRepository(prismaClient),
    },
    {
      provide: 'IBrandRepository',
      useValue: new BrandRepository(prismaClient),
    },
    CreateProductUseCase,
    GetProductUseCase,
    GetProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    CreateCategoryUseCase,
    GetCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    CreateBrandUseCase,
    GetBrandUseCase,
    GetBrandsUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
    JwtStrategy,
  ],
  controllers: [ProductController, CategoryController, BrandController],
})
export class ProductModule {}

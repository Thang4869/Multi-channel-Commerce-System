import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository, ProductQuery } from '../../application/interfaces';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        brandId: product.brandId,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
      },
    });

    return this.mapToEntity(created);
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    return product ? this.mapToEntity(product) : null;
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });

    return product ? this.mapToEntity(product) : null;
  }

  async findAll(query: ProductQuery): Promise<{ items: Product[]; total: number }> {
    const where: Prisma.ProductWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.brandId) {
      where.brandId = query.brandId;
    }

    if (typeof query.isActive === 'boolean') {
      where.isActive = query.isActive;
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {
        ...(query.minPrice !== undefined ? { gte: query.minPrice } : {}),
        ...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {}),
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: items.map(item => this.mapToEntity(item)),
      total,
    };
  }

  async update(productId: string, data: Partial<Product>): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id: productId },
      data: {
        sku: data.sku,
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        brandId: data.brandId,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
      },
    });

    return this.mapToEntity(updated);
  }

  async delete(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id: productId },
    });
  }

  private mapToEntity(data: any): Product {
    return new Product({
      id: data.id,
      sku: data.sku,
      name: data.name,
      description: data.description,
      price: Number(data.price),
      categoryId: data.categoryId,
      brandId: data.brandId,
      imageUrl: data.imageUrl || undefined,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

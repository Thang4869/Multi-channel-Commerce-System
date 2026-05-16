import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../application/interfaces';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
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

  async findAll(
    page: number,
    limit: number,
    filters?: { categoryId?: string; brandId?: string; search?: string },
  ): Promise<{ items: Product[]; total: number }> {
    const where: any = {
      ...(filters?.categoryId ? { categoryId: filters.categoryId } : {}),
      ...(filters?.brandId ? { brandId: filters.brandId } : {}),
      ...(filters?.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: 'insensitive' } },
              { description: { contains: filters.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: products.map((p: any) => this.mapToEntity(p)),
      total,
    };
  }

  async update(productId: string, data: Partial<Product>): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id: productId },
      data,
    });

    return this.mapToEntity(updated);
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
      imageUrl: data.imageUrl ?? undefined,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

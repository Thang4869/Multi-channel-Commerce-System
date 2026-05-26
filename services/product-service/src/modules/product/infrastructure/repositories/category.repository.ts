import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryRepository } from '../../application/interfaces';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: any) {}

  async create(category: Category): Promise<Category> {
    const created = await this.prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
    });

    return this.mapToEntity(created);
  }

  async findById(categoryId: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    return category ? this.mapToEntity(category) : null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { slug },
    });

    return category ? this.mapToEntity(category) : null;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return categories.map((category: any) => this.mapToEntity(category));
  }

  async update(categoryId: string, data: Partial<Category>): Promise<Category> {
    const updated = await this.prisma.category.update({
      where: { id: categoryId },
      data: {
        name: data.name,
        slug: data.slug,
      },
    });

    return this.mapToEntity(updated);
  }

  async delete(categoryId: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }

  private mapToEntity(data: any): Category {
    return new Category({
      id: data.id,
      name: data.name,
      slug: data.slug,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

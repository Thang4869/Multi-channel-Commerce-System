import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryRepository } from '../interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(data: { name: string; slug?: string }): Promise<Category> {
    const slug = this.normalizeSlug(data.slug || data.name);
    if (!slug) {
      throw new BadRequestException('Slug is required');
    }

    const existing = await this.categoryRepository.findBySlug(slug);
    if (existing) {
      throw new BadRequestException('Category slug already exists');
    }

    const category = new Category({
      id: uuid(),
      name: data.name,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.categoryRepository.create(category);
  }

  private normalizeSlug(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}

import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity';
import { ICategoryRepository } from '../interfaces';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(categoryId: string, data: Partial<Category>): Promise<Category> {
    const existing = await this.categoryRepository.findById(categoryId);
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    let slug = data.slug ? this.normalizeSlug(data.slug) : undefined;
    if (!slug && data.name) {
      slug = this.normalizeSlug(data.name);
    }

    if (slug) {
      const slugExists = await this.categoryRepository.findBySlug(slug);
      if (slugExists && slugExists.id !== categoryId) {
        throw new BadRequestException('Category slug already exists');
      }
    }

    return this.categoryRepository.update(categoryId, {
      name: data.name ?? undefined,
      slug: slug ?? undefined,
    });
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

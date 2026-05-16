import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICategoryRepository } from '../interfaces';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(categoryId: string): Promise<void> {
    const existing = await this.categoryRepository.findById(categoryId);
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.delete(categoryId);
  }
}

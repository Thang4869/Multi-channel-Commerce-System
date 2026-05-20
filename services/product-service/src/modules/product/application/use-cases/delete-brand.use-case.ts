import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IBrandRepository } from '../interfaces';

@Injectable()
export class DeleteBrandUseCase {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(brandId: string): Promise<void> {
    const existing = await this.brandRepository.findById(brandId);
    if (!existing) {
      throw new NotFoundException('Brand not found');
    }

    await this.brandRepository.delete(brandId);
  }
}

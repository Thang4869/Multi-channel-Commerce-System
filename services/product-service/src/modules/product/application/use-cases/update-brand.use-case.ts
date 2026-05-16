import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Brand } from '../../domain/entities/brand.entity';
import { IBrandRepository } from '../interfaces';

@Injectable()
export class UpdateBrandUseCase {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(brandId: string, data: Partial<Brand>): Promise<Brand> {
    const existing = await this.brandRepository.findById(brandId);
    if (!existing) {
      throw new NotFoundException('Brand not found');
    }

    return this.brandRepository.update(brandId, {
      name: data.name ?? undefined,
      logo: data.logo ?? undefined,
    });
  }
}

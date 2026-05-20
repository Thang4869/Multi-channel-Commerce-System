import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Brand } from '../../domain/entities/brand.entity';
import { IBrandRepository } from '../interfaces';

@Injectable()
export class GetBrandUseCase {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(brandId: string): Promise<Brand> {
    const brand = await this.brandRepository.findById(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }
}

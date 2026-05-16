import { Injectable, Inject } from '@nestjs/common';
import { Brand } from '../../domain/entities/brand.entity';
import { IBrandRepository } from '../interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateBrandUseCase {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(data: { name: string; logo?: string }): Promise<Brand> {
    const brand = new Brand({
      id: uuid(),
      name: data.name,
      logo: data.logo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.brandRepository.create(brand);
  }
}

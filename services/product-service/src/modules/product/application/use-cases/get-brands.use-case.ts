import { Injectable, Inject } from '@nestjs/common';
import { Brand } from '../../domain/entities/brand.entity';
import { IBrandRepository } from '../interfaces';

@Injectable()
export class GetBrandsUseCase {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(): Promise<Brand[]> {
    return this.brandRepository.findAll();
  }
}

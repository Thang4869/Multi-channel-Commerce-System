import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IProductRepository } from '../interfaces';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(productId: string): Promise<void> {
    const existing = await this.productRepository.findById(productId);
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(productId);
  }
}

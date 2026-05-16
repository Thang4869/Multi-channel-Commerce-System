import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../interfaces';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}

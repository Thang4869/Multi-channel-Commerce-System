import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository, ICategoryRepository, IBrandRepository } from '../interfaces';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(productId: string, data: Partial<Product>): Promise<Product> {
    const existing = await this.productRepository.findById(productId);
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    if (data.price !== undefined && data.price < 0) {
      throw new BadRequestException('Price must be greater than or equal to 0');
    }

    if (data.sku && data.sku !== existing.sku) {
      const skuExists = await this.productRepository.findBySku(data.sku);
      if (skuExists) {
        throw new BadRequestException('SKU already exists');
      }
    }

    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    if (data.brandId) {
      const brand = await this.brandRepository.findById(data.brandId);
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    return this.productRepository.update(productId, data);
  }
}

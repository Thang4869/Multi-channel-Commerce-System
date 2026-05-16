import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository, ICategoryRepository, IBrandRepository } from '../interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async execute(data: {
    sku: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    brandId: string;
    imageUrl?: string;
    isActive?: boolean;
  }): Promise<Product> {
    if (data.price < 0) {
      throw new BadRequestException('Price must be greater than or equal to 0');
    }

    const existingSku = await this.productRepository.findBySku(data.sku);
    if (existingSku) {
      throw new BadRequestException('SKU already exists');
    }

    const category = await this.categoryRepository.findById(data.categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const brand = await this.brandRepository.findById(data.brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    const product = new Product({
      id: uuid(),
      sku: data.sku,
      name: data.name,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      brandId: data.brandId,
      imageUrl: data.imageUrl,
      isActive: data.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.productRepository.create(product);
  }
}

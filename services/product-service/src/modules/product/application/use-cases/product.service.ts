import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProductRepository, IProductService } from '../interfaces';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async createProduct(data: {
    sku: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    brandId: string;
    imageUrl?: string;
  }): Promise<Product> {
    const existing = await this.productRepository.findBySku(data.sku);
    if (existing) {
      throw new BadRequestException(`Product SKU ${data.sku} already exists`);
    }

    const product = new Product({
      ...data,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.productRepository.create(product);
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async listProducts(
    page: number,
    limit: number,
    filters?: { categoryId?: string; brandId?: string; search?: string },
  ): Promise<{ items: Product[]; total: number; page: number; limit: number; totalPages: number }> {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

    const result = await this.productRepository.findAll(safePage, safeLimit, filters);

    return {
      ...result,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(result.total / safeLimit),
    };
  }

  async updateProduct(productId: string, data: Partial<Product>): Promise<Product> {
    await this.getProduct(productId);
    return this.productRepository.update(productId, data);
  }
}

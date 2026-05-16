import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository, ProductQuery } from '../interfaces';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: ProductQuery): Promise<{
    items: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { items, total } = await this.productRepository.findAll(query);
    const totalPages = total === 0 ? 0 : Math.ceil(total / query.limit);

    return {
      items,
      total,
      page: query.page,
      limit: query.limit,
      totalPages,
    };
  }
}

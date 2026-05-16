import { Product } from '../../domain/entities/product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(productId: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(
    page: number,
    limit: number,
    filters?: { categoryId?: string; brandId?: string; search?: string },
  ): Promise<{ items: Product[]; total: number }>;
  update(productId: string, data: Partial<Product>): Promise<Product>;
}

export interface IProductService {
  createProduct(data: {
    sku: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    brandId: string;
    imageUrl?: string;
  }): Promise<Product>;
  getProduct(productId: string): Promise<Product>;
  listProducts(
    page: number,
    limit: number,
    filters?: { categoryId?: string; brandId?: string; search?: string },
  ): Promise<{ items: Product[]; total: number; page: number; limit: number; totalPages: number }>;
  updateProduct(productId: string, data: Partial<Product>): Promise<Product>;
}

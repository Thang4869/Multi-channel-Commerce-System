// ============================================
// APPLICATION - INTERFACES
// ============================================

import { Product } from '../../domain/entities/product.entity';
import { Category } from '../../domain/entities/category.entity';
import { Brand } from '../../domain/entities/brand.entity';

export interface ProductQuery {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(productId: string): Promise<Product | null>;
  findBySku(sku: string): Promise<Product | null>;
  findAll(query: ProductQuery): Promise<{ items: Product[]; total: number }>;
  update(productId: string, data: Partial<Product>): Promise<Product>;
  delete(productId: string): Promise<void>;
}

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  findById(categoryId: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  update(categoryId: string, data: Partial<Category>): Promise<Category>;
  delete(categoryId: string): Promise<void>;
}

export interface IBrandRepository {
  create(brand: Brand): Promise<Brand>;
  findById(brandId: string): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  update(brandId: string, data: Partial<Brand>): Promise<Brand>;
  delete(brandId: string): Promise<void>;
}

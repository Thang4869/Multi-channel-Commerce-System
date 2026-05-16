// ============================================
// APPLICATION - DTOs
// ============================================

// ========== PRODUCT DTOs ==========
export class CreateProductDto {
  sku!: string;
  name!: string;
  description!: string;
  price!: number;
  categoryId!: string;
  brandId!: string;
  imageUrl?: string;
  isActive?: boolean;
}

export class UpdateProductDto {
  sku?: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  brandId?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export class ProductResponseDto {
  id!: string;
  sku!: string;
  name!: string;
  description!: string;
  price!: number;
  categoryId!: string;
  brandId!: string;
  imageUrl?: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PaginatedProductsDto {
  items!: ProductResponseDto[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}

// ========== CATEGORY DTOs ==========
export class CreateCategoryDto {
  name!: string;
  slug?: string;
}

export class UpdateCategoryDto {
  name?: string;
  slug?: string;
}

export class CategoryResponseDto {
  id!: string;
  name!: string;
  slug!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

// ========== BRAND DTOs ==========
export class CreateBrandDto {
  name!: string;
  logo?: string;
}

export class UpdateBrandDto {
  name?: string;
  logo?: string;
}

export class BrandResponseDto {
  id!: string;
  name!: string;
  logo?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

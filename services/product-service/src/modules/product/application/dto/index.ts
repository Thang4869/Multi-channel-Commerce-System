export class CreateProductDto {
  sku!: string;
  name!: string;
  description!: string;
  price!: number;
  categoryId!: string;
  brandId!: string;
  imageUrl?: string;
}

export class UpdateProductDto {
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

export class ProductQueryDto {
  page: number = 1;
  limit: number = 10;
  categoryId?: string;
  brandId?: string;
  search?: string;
}

export class PaginatedProductsDto {
  items!: ProductResponseDto[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;
}

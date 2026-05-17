// ============================================
// DOMAIN - PRODUCT ENTITY
// ============================================

export class Product {
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

  constructor(data: Partial<Product>) {
    Object.assign(this, data);
  }
}

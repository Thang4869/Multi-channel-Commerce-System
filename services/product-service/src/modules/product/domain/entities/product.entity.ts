export class Category {
  id!: string;
  name!: string;
  slug!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<Category>) {
    Object.assign(this, data);
  }
}

export class Brand {
  id!: string;
  name!: string;
  logo?: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<Brand>) {
    Object.assign(this, data);
  }
}

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
  category?: Category;
  brand?: Brand;

  constructor(data: Partial<Product>) {
    Object.assign(this, data);
  }

  deactivate(): void {
    this.isActive = false;
  }

  activate(): void {
    this.isActive = true;
  }
}

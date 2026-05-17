// ============================================
// DOMAIN - BRAND ENTITY
// ============================================

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

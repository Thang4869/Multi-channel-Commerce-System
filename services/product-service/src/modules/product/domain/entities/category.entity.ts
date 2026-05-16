// ============================================
// DOMAIN - CATEGORY ENTITY
// ============================================

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

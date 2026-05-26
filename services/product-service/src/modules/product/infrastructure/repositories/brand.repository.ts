import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Brand } from '../../domain/entities/brand.entity';
import { IBrandRepository } from '../../application/interfaces';

@Injectable()
export class BrandRepository implements IBrandRepository {
  constructor(private readonly prisma: any) {}

  async create(brand: Brand): Promise<Brand> {
    const created = await this.prisma.brand.create({
      data: {
        id: brand.id,
        name: brand.name,
        logo: brand.logo,
      },
    });

    return this.mapToEntity(created);
  }

  async findById(brandId: string): Promise<Brand | null> {
    const brand = await this.prisma.brand.findUnique({
      where: { id: brandId },
    });

    return brand ? this.mapToEntity(brand) : null;
  }

  async findAll(): Promise<Brand[]> {
    const brands = await this.prisma.brand.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return brands.map((brand: any) => this.mapToEntity(brand));
  }

  async update(brandId: string, data: Partial<Brand>): Promise<Brand> {
    const updated = await this.prisma.brand.update({
      where: { id: brandId },
      data: {
        name: data.name,
        logo: data.logo,
      },
    });

    return this.mapToEntity(updated);
  }

  async delete(brandId: string): Promise<void> {
    await this.prisma.brand.delete({
      where: { id: brandId },
    });
  }

  private mapToEntity(data: any): Brand {
    return new Brand({
      id: data.id,
      name: data.name,
      logo: data.logo || undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}

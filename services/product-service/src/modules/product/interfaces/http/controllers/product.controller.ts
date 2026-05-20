// ============================================
// INTERFACES - PRODUCT CONTROLLER
// ============================================

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
  PaginatedProductsDto,
} from '../../../application/dto';
import {
  CreateProductUseCase,
  GetProductUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../../../application/use-cases';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new product' })
  async createProduct(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(dto);
    return this.mapToResponse(product);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  async getProduct(@Param('id') productId: string): Promise<ProductResponseDto> {
    const product = await this.getProductUseCase.execute(productId);
    return this.mapToResponse(product);
  }

  @Get()
  @ApiOperation({ summary: 'Get products with pagination and filters' })
  async getProducts(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('isActive') isActive?: string,
  ): Promise<PaginatedProductsDto> {
    const parsedPage = this.toPositiveInt(page, 1);
    const parsedLimit = this.toPositiveInt(limit, 10);
    const parsedMinPrice = this.toNumber(minPrice);
    const parsedMaxPrice = this.toNumber(maxPrice);
    const parsedIsActive = this.toBoolean(isActive);

    const result = await this.getProductsUseCase.execute({
      page: parsedPage,
      limit: parsedLimit,
      search: search?.trim(),
      categoryId,
      brandId,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
      isActive: parsedIsActive,
    });

    return {
      items: result.items.map(product => this.mapToResponse(product)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product by ID' })
  async updateProduct(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.updateProductUseCase.execute(productId, dto);
    return this.mapToResponse(product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete product by ID' })
  async deleteProduct(@Param('id') productId: string): Promise<{ success: boolean }> {
    await this.deleteProductUseCase.execute(productId);
    return { success: true };
  }

  private mapToResponse(product: any): ProductResponseDto {
    return {
      id: product.id,
      sku: product.sku,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      brandId: product.brandId,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  private toPositiveInt(value: string | undefined, defaultValue: number): number {
    const parsed = Number(value);
    if (Number.isNaN(parsed) || parsed <= 0) {
      return defaultValue;
    }
    return Math.floor(parsed);
  }

  private toNumber(value?: string): number | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  private toBoolean(value?: string): boolean | undefined {
    if (value === undefined) {
      return undefined;
    }
    if (value.toLowerCase() === 'true') {
      return true;
    }
    if (value.toLowerCase() === 'false') {
      return false;
    }
    return undefined;
  }
}

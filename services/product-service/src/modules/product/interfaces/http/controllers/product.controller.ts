import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateProductDto,
  PaginatedProductsDto,
  ProductResponseDto,
  ProductQueryDto,
  UpdateProductDto,
} from '../../../application/dto';
import { ProductService } from '../../../application/use-cases/product.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller()
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('products')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a product' })
  async createProduct(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.productService.createProduct(dto);
    return this.mapToResponse(product);
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by id' })
  async getProduct(@Param('id') productId: string): Promise<ProductResponseDto> {
    const product = await this.productService.getProduct(productId);
    return this.mapToResponse(product);
  }

  @Get('products')
  @ApiOperation({ summary: 'List products' })
  async listProducts(@Query() query: ProductQueryDto): Promise<PaginatedProductsDto> {
    const result = await this.productService.listProducts(query.page, query.limit, {
      categoryId: query.categoryId,
      brandId: query.brandId,
      search: query.search,
    });

    return {
      items: result.items.map(item => this.mapToResponse(item)),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  @Patch('products/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a product' })
  async updateProduct(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productService.updateProduct(productId, dto);
    return this.mapToResponse(product);
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
}

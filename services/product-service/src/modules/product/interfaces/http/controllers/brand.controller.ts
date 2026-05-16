// ============================================
// INTERFACES - BRAND CONTROLLER
// ============================================

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateBrandDto,
  UpdateBrandDto,
  BrandResponseDto,
} from '../../../application/dto';
import {
  CreateBrandUseCase,
  GetBrandUseCase,
  GetBrandsUseCase,
  UpdateBrandUseCase,
  DeleteBrandUseCase,
} from '../../../application/use-cases';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandController {
  constructor(
    private readonly createBrandUseCase: CreateBrandUseCase,
    private readonly getBrandUseCase: GetBrandUseCase,
    private readonly getBrandsUseCase: GetBrandsUseCase,
    private readonly updateBrandUseCase: UpdateBrandUseCase,
    private readonly deleteBrandUseCase: DeleteBrandUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new brand' })
  async createBrand(@Body() dto: CreateBrandDto): Promise<BrandResponseDto> {
    const brand = await this.createBrandUseCase.execute(dto);
    return this.mapToResponse(brand);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by ID' })
  async getBrand(@Param('id') brandId: string): Promise<BrandResponseDto> {
    const brand = await this.getBrandUseCase.execute(brandId);
    return this.mapToResponse(brand);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  async getBrands(): Promise<BrandResponseDto[]> {
    const brands = await this.getBrandsUseCase.execute();
    return brands.map(brand => this.mapToResponse(brand));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update brand by ID' })
  async updateBrand(
    @Param('id') brandId: string,
    @Body() dto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.updateBrandUseCase.execute(brandId, dto);
    return this.mapToResponse(brand);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete brand by ID' })
  async deleteBrand(@Param('id') brandId: string): Promise<{ success: boolean }> {
    await this.deleteBrandUseCase.execute(brandId);
    return { success: true };
  }

  private mapToResponse(brand: any): BrandResponseDto {
    return {
      id: brand.id,
      name: brand.name,
      logo: brand.logo,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    };
  }
}

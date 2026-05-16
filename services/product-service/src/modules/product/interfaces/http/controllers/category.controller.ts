// ============================================
// INTERFACES - CATEGORY CONTROLLER
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
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponseDto,
} from '../../../application/dto';
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  GetCategoriesUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
} from '../../../application/use-cases';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new category' })
  async createCategory(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = await this.createCategoryUseCase.execute(dto);
    return this.mapToResponse(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  async getCategory(@Param('id') categoryId: string): Promise<CategoryResponseDto> {
    const category = await this.getCategoryUseCase.execute(categoryId);
    return this.mapToResponse(category);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async getCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.getCategoriesUseCase.execute();
    return categories.map(category => this.mapToResponse(category));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update category by ID' })
  async updateCategory(
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.updateCategoryUseCase.execute(categoryId, dto);
    return this.mapToResponse(category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete category by ID' })
  async deleteCategory(@Param('id') categoryId: string): Promise<{ success: boolean }> {
    await this.deleteCategoryUseCase.execute(categoryId);
    return { success: true };
  }

  private mapToResponse(category: any): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}

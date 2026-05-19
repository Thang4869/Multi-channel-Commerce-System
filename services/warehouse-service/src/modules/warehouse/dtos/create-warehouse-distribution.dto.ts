import { IsString, IsNotEmpty, IsInt, Min, IsOptional, IsDateString } from 'class-validator';

export class CreateWarehouseDistributionDto {
  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsNotEmpty()
  storeId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsDateString()
  @IsOptional()
  estimatedDelivery?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

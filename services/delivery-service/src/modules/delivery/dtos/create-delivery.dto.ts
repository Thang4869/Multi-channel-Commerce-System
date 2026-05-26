import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsDateString } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsString()
  @IsNotEmpty()
  destLocationAddress!: string;

  @IsDecimal()
  destLocationLat!: number;

  @IsDecimal()
  destLocationLng!: number;

  @IsDateString()
  estimatedDeliveryTime!: string;

  @IsString()
  @IsOptional()
  shipperId?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

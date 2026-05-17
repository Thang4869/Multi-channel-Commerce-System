import { IsString, IsNotEmpty, IsDecimal, IsOptional } from 'class-validator';

export class UpdateDeliveryStatusDto {
  @IsString()
  @IsNotEmpty()
  deliveryId: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDecimal()
  @IsOptional()
  latitude?: number;

  @IsDecimal()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

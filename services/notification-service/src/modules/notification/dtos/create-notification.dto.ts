import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}

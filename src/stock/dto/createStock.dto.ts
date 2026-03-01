import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class CreateStockDto {
  @IsString()
  productId: string;

  @IsString()
  @IsOptional()
  variantId?: string;

  @IsString()
  warehouseId: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  lowStockThreshold?: number;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;
}

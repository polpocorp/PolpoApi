import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class UpdateStockDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  variantId?: string;

  @IsString()
  @IsOptional()
  warehouseId?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  lowStockThreshold?: number;

  @IsDateString()
  @IsOptional()
  expiryDate?: string;
}

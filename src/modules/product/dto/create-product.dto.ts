import { ProductStatus } from '@prisma/client';
import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  sku: string;

  @IsMongoId()
  categoryId: string;

  @IsMongoId()
  @IsOptional()
  subCategoryId?: string | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsMongoId()
  @IsOptional()
  supplierId?: string | null;

  @IsMongoId()
  createdById: string;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;

  @IsArray()
  @IsOptional()
  variants?: any[]; // Define una interfaz específica si es necesario

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  stock?: string[];

  @IsArray()
  @IsOptional()
  prices?: any[];

  @IsArray()
  @IsOptional()
  customFields?: any[];

  @IsArray()
  @IsOptional()
  purchaseOrders?: any[];

  @IsArray()
  @IsOptional()
  saleItems?: any[];

  @IsArray()
  @IsOptional()
  productMaterials?: any[];

  @IsOptional()
  status?: ProductStatus;

  @IsOptional()
  statusReason?: string | null;
}
// create-product.dto.ts

// update-product.dto.ts
export class UpdateProductDto {
  name?: string;
  description?: string;
  sku?: string;
  categoryId?: string;
  subCategoryId?: string | null;
  supplierId?: string | null;
  images?: string[];
  status?: ProductStatus;
  statusReason?: string | null;
}

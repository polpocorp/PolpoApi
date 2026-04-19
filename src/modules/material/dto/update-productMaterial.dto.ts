import {
  IsString,
  IsNumber,
  IsMongoId,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsMongoId({ message: 'productId must be a valid MongoDB ObjectId' })
  productId?: string;

  @IsOptional()
  @IsMongoId({ message: 'rawMaterialId must be a valid MongoDB ObjectId' })
  rawMaterialId?: string;

  @IsOptional()
  @IsNumber({}, { message: 'quantity must be a number' })
  @Min(0, { message: 'quantity must be a positive number' })
  quantity?: number;

  @IsOptional()
  @IsString({ message: 'unitOfMeasure must be a string' })
  unitOfMeasure?: string;
}

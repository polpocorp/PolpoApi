import { IsString, IsNumber, IsMongoId, Min } from 'class-validator';

export class CreateMaterialDto {
  @IsMongoId({ message: 'productId must be a valid MongoDB ObjectId' })
  productId: string;

  @IsMongoId({ message: 'rawMaterialId must be a valid MongoDB ObjectId' })
  rawMaterialId: string;

  @IsNumber({}, { message: 'quantity must be a number' })
  @Min(0, { message: 'quantity must be a positive number' })
  quantity: number;

  @IsString({ message: 'unitOfMeasure must be a string' })
  unitOfMeasure: string;
}

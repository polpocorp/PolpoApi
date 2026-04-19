import { IsString, IsOptional, Matches } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId for categoryId' })
  categoryId?: string;
}

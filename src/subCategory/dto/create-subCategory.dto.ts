import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Category ID is required' })
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId for categoryId' })
  categoryId: string;
}

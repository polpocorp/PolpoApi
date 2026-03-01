import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  name: string;
}

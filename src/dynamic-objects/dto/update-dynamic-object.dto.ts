import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { DynamicFieldDefinition } from '../interfaces/dynamic-object.interface';

export class UpdateDynamicObjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @IsDefined({ always: false }) // solo se valida si viene el array
  fields?: DynamicFieldDefinition[];
}

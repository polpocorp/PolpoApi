// src/warehouse/dto/create-warehouse.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsNotEmpty({ message: 'El nombre del almacén es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena' })
  name: string;

  @IsNotEmpty({ message: 'La ubicación del almacén es requerida' })
  @IsString({ message: 'La ubicación debe ser una cadena' })
  location: string;
}

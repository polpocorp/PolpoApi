import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  IsDefined,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

// Decorador custom simple para validar que el type sea uno de los 4 valores permitidos
@ValidatorConstraint({ name: 'isFieldType', async: false })
class IsFieldTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN'].includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `El tipo de campo debe ser uno de: TEXT, NUMBER, DATE, BOOLEAN`;
  }
}

function IsFieldType() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      constraints: [],
      validator: IsFieldTypeConstraint,
    });
  };
}

// ────────────────────────────────────────────────

class FieldDefinitionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsFieldType()
  type: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  // @IsAny()  ← no existe, lo dejamos sin decorador fuerte
  defaultValue?: any;
}

export class CreateDynamicObjectDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El slug es obligatorio' })
  slug: string;

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
  @IsDefined()
  fields: FieldDefinitionDto[];
}

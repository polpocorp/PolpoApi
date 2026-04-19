export class CreateCustomFieldDto {
  productId: string;
  name: string;
  value: string;
  type: string; // Assuming FieldType is an enum, represented as string
}

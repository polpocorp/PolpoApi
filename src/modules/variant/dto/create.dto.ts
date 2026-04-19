export class CreateVariantDto {
  productId: string;
  warehouseId: string;
  name: string;
  sku: string;
  attributes: Record<string, any>;
}

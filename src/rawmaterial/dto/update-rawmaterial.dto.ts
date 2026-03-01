export class UpdateRawMaterialDto {
  name?: string;
  description?: string | null;
  sku?: string;
  supplierId?: string;
  unitPrice?: number;
  currency?: string;
  unitOfMeasure?: string;
  stockQuantity?: number;
  lowStockThreshold?: number | null;
}

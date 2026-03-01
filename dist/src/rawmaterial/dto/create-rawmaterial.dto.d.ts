export declare class CreateRawMaterialDto {
    name: string;
    description?: string;
    sku: string;
    supplierId: string;
    unitPrice: number;
    currency?: string;
    unitOfMeasure: string;
    stockQuantity: number;
    lowStockThreshold?: number;
}

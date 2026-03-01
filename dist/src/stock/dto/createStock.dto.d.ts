export declare class CreateStockDto {
    productId: string;
    variantId?: string;
    warehouseId: string;
    quantity: number;
    lowStockThreshold?: number;
    expiryDate?: string;
}

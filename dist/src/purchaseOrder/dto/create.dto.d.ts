export declare class CreatePurchaseOrderProductDto {
    productId: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreatePurchaseOrderDto {
    supplierId: string;
    createdById: string;
    orderDate?: Date;
    status: string;
    totalAmount: number;
    products: CreatePurchaseOrderProductDto[];
}

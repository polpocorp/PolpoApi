export declare class CreateSaleItemDto {
    productId: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateSaleDto {
    userId: string;
    customerId?: string | null;
    saleDate?: Date;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    items: CreateSaleItemDto[];
}

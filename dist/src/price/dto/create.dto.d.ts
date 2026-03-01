export declare class CreatePriceDto {
    productId: string;
    variantId?: string | null;
    type: string;
    amount: number;
    currency?: string;
    validFrom: Date;
    validUntil?: Date | null;
}

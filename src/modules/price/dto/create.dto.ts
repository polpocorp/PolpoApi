export class CreatePriceDto {
  productId: string;
  variantId?: string | null;
  type: string; // Assuming PriceType is an enum, represented as string
  amount: number;
  currency?: string;
  validFrom: Date;
  validUntil?: Date | null;
}

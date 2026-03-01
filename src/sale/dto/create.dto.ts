export class CreateSaleItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class CreateSaleDto {
  userId: string;
  customerId?: string | null;
  saleDate?: Date;
  totalAmount: number;
  paymentMethod: string; // Assuming PaymentMethod is an enum, represented as string
  status: string; // Assuming SaleStatus is an enum, represented as string
  items: CreateSaleItemDto[];
}

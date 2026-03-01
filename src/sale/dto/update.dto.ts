export class UpdateSaleDto {
  customerId?: string | null;
  saleDate?: Date;
  totalAmount?: number;
  paymentMethod?: string;
  status?: string;
}

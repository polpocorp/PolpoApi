export class UpdatePurchaseOrderDto {
  supplierId?: string;
  orderDate?: Date;
  status?: string; // Assuming OrderStatus is an enum, represented as string
  totalAmount?: number;
}

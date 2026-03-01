export class CreatePurchaseOrderProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export class CreatePurchaseOrderDto {
  supplierId: string;
  createdById: string;
  orderDate?: Date;
  status: string; // Assuming OrderStatus is an enum, represented as string
  totalAmount: number;
  products: CreatePurchaseOrderProductDto[];
}

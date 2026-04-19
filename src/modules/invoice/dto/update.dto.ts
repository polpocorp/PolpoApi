export class UpdateInvoiceDto {
  invoiceNumber?: string;
  issueDate?: Date;
  totalAmount?: number;
  taxAmount?: number | null;
}

export declare class CreateInvoiceDto {
    saleId: string;
    invoiceNumber: string;
    issueDate?: Date;
    totalAmount: number;
    taxAmount?: number | null;
}

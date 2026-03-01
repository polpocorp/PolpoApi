import { CreateInvoiceDto } from './dto/create.dto';
import { UpdateInvoiceDto } from './dto/update.dto';
import { InvoiceService } from './invoice.service';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    create(createInvoiceDto: CreateInvoiceDto): Promise<{
        sale: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        saleId: string;
        invoiceNumber: string;
        issueDate: Date;
        taxAmount: number | null;
    }>;
    findAll(): Promise<({
        sale: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        saleId: string;
        invoiceNumber: string;
        issueDate: Date;
        taxAmount: number | null;
    })[]>;
    findOne(id: string): Promise<{
        sale: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        saleId: string;
        invoiceNumber: string;
        issueDate: Date;
        taxAmount: number | null;
    }>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<{
        sale: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        saleId: string;
        invoiceNumber: string;
        issueDate: Date;
        taxAmount: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        totalAmount: number;
        saleId: string;
        invoiceNumber: string;
        issueDate: Date;
        taxAmount: number | null;
    }>;
}

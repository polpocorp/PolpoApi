import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create.dto';
import { UpdateSaleDto } from './dto/update.dto';
export declare class SaleController {
    private readonly saleService;
    constructor(saleService: SaleService);
    create(createSaleDto: CreateSaleDto): Promise<{
        items: {
            id: string;
            productId: string;
            quantity: number;
            variantId: string | null;
            saleId: string;
            unitPrice: number;
            isAdHoc: boolean;
            adHocName: string | null;
            adHocDescription: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.SaleStatus;
        userId: string;
        customerId: string | null;
        saleDate: Date;
        totalAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
        customer: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            loyaltyPoints: number;
        } | null;
        items: {
            id: string;
            productId: string;
            quantity: number;
            variantId: string | null;
            saleId: string;
            unitPrice: number;
            isAdHoc: boolean;
            adHocName: string | null;
            adHocDescription: string | null;
        }[];
        invoice: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            totalAmount: number;
            saleId: string;
            invoiceNumber: string;
            issueDate: Date;
            taxAmount: number | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.SaleStatus;
        userId: string;
        customerId: string | null;
        saleDate: Date;
        totalAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
        customer: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            loyaltyPoints: number;
        } | null;
        items: {
            id: string;
            productId: string;
            quantity: number;
            variantId: string | null;
            saleId: string;
            unitPrice: number;
            isAdHoc: boolean;
            adHocName: string | null;
            adHocDescription: string | null;
        }[];
        invoice: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            totalAmount: number;
            saleId: string;
            invoiceNumber: string;
            issueDate: Date;
            taxAmount: number | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.SaleStatus;
        userId: string;
        customerId: string | null;
        saleDate: Date;
        totalAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
    }>;
    update(id: string, updateSaleDto: UpdateSaleDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.SaleStatus;
        userId: string;
        customerId: string | null;
        saleDate: Date;
        totalAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.SaleStatus;
        userId: string;
        customerId: string | null;
        saleDate: Date;
        totalAmount: number;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
    }>;
}

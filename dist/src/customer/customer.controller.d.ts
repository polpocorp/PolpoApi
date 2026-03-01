import { CreateCustomerDto } from './dto/create.dto';
import { UpdateCustomerDto } from './dto/update.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        purchaseHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        loyaltyPoints: number;
    }>;
    findAll(): Promise<({
        purchaseHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        loyaltyPoints: number;
    })[]>;
    findOne(id: string): Promise<{
        purchaseHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        loyaltyPoints: number;
    }>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<{
        purchaseHistory: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.SaleStatus;
            userId: string;
            customerId: string | null;
            saleDate: Date;
            totalAmount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        loyaltyPoints: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        loyaltyPoints: number;
    }>;
}

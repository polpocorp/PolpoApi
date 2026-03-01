import { CreatePurchaseOrderDto } from './dto/create.dto';
import { UpdatePurchaseOrderDto } from './dto/update.dto';
import { PurchaseOrderService } from './purchaseOrder.service';
export declare class PurchaseOrderController {
    private readonly purchaseOrderService;
    constructor(purchaseOrderService: PurchaseOrderService);
    create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<{
        products: {
            id: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
        supplier: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
            state: string | null;
            city: string | null;
            numberStreet: string | null;
            paymentTerms: string | null;
            productsSupplied: string[];
        };
        createdBy: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supplierId: string;
        createdById: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        orderDate: Date;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
        supplier: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
            state: string | null;
            city: string | null;
            numberStreet: string | null;
            paymentTerms: string | null;
            productsSupplied: string[];
        };
        createdBy: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supplierId: string;
        createdById: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        orderDate: Date;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
        supplier: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
            state: string | null;
            city: string | null;
            numberStreet: string | null;
            paymentTerms: string | null;
            productsSupplied: string[];
        };
        createdBy: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supplierId: string;
        createdById: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        orderDate: Date;
    }>;
    update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto): Promise<{
        products: {
            id: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
        supplier: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            address: string | null;
            state: string | null;
            city: string | null;
            numberStreet: string | null;
            paymentTerms: string | null;
            productsSupplied: string[];
        };
        createdBy: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supplierId: string;
        createdById: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        orderDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        supplierId: string;
        createdById: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        orderDate: Date;
    }>;
}

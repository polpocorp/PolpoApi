import { CreatePurchaseOrderProductDto } from './dto/create.dto';
import { UpdatePurchaseOrderProductDto } from './dto/update.dto';
import { PurchaseOrderProductService } from './purchaseOrderProduct.service';
export declare class PurchaseOrderProductController {
    private readonly purchaseOrderProductService;
    constructor(purchaseOrderProductService: PurchaseOrderProductService);
    create(createPurchaseOrderProductDto: CreatePurchaseOrderProductDto): Promise<{
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            description: string | null;
            sku: string;
            subCategoryId: string | null;
            supplierId: string | null;
            images: string[];
            createdById: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.ProductStatus;
            statusChangedAt: Date | null;
            statusReason: string | null;
        };
        purchaseOrder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            supplierId: string;
            createdById: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalAmount: number;
            orderDate: Date;
        };
    } & {
        id: string;
        productId: string;
        quantity: number;
        unitPrice: number;
        purchaseOrderId: string;
    }>;
    findAll(): Promise<({
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            description: string | null;
            sku: string;
            subCategoryId: string | null;
            supplierId: string | null;
            images: string[];
            createdById: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.ProductStatus;
            statusChangedAt: Date | null;
            statusReason: string | null;
        };
        purchaseOrder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            supplierId: string;
            createdById: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalAmount: number;
            orderDate: Date;
        };
    } & {
        id: string;
        productId: string;
        quantity: number;
        unitPrice: number;
        purchaseOrderId: string;
    })[]>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            description: string | null;
            sku: string;
            subCategoryId: string | null;
            supplierId: string | null;
            images: string[];
            createdById: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.ProductStatus;
            statusChangedAt: Date | null;
            statusReason: string | null;
        };
        purchaseOrder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            supplierId: string;
            createdById: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalAmount: number;
            orderDate: Date;
        };
    } & {
        id: string;
        productId: string;
        quantity: number;
        unitPrice: number;
        purchaseOrderId: string;
    }>;
    update(id: string, updatePurchaseOrderProductDto: UpdatePurchaseOrderProductDto): Promise<{
        product: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            description: string | null;
            sku: string;
            subCategoryId: string | null;
            supplierId: string | null;
            images: string[];
            createdById: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.ProductStatus;
            statusChangedAt: Date | null;
            statusReason: string | null;
        };
        purchaseOrder: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            supplierId: string;
            createdById: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalAmount: number;
            orderDate: Date;
        };
    } & {
        id: string;
        productId: string;
        quantity: number;
        unitPrice: number;
        purchaseOrderId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        productId: string;
        quantity: number;
        unitPrice: number;
        purchaseOrderId: string;
    }>;
}

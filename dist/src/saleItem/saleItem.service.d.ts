import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleItemDto } from './dto/create.dto';
import { UpdateSaleItemDto } from './dto/update.dto';
export declare class SaleItemService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSaleItemDto: CreateSaleItemDto): Promise<{
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
        variant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            productId: string;
            attributes: import("@prisma/client/runtime/library").JsonValue;
        } | null;
    } & {
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        saleId: string;
        unitPrice: number;
        isAdHoc: boolean;
        adHocName: string | null;
        adHocDescription: string | null;
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
        variant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            productId: string;
            attributes: import("@prisma/client/runtime/library").JsonValue;
        } | null;
    } & {
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        saleId: string;
        unitPrice: number;
        isAdHoc: boolean;
        adHocName: string | null;
        adHocDescription: string | null;
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
        variant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            productId: string;
            attributes: import("@prisma/client/runtime/library").JsonValue;
        } | null;
    } & {
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        saleId: string;
        unitPrice: number;
        isAdHoc: boolean;
        adHocName: string | null;
        adHocDescription: string | null;
    }>;
    update(id: string, updateSaleItemDto: UpdateSaleItemDto): Promise<{
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
        variant: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            productId: string;
            attributes: import("@prisma/client/runtime/library").JsonValue;
        } | null;
    } & {
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        saleId: string;
        unitPrice: number;
        isAdHoc: boolean;
        adHocName: string | null;
        adHocDescription: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        productId: string;
        quantity: number;
        variantId: string | null;
        saleId: string;
        unitPrice: number;
        isAdHoc: boolean;
        adHocName: string | null;
        adHocDescription: string | null;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateVariantDto } from './dto/create.dto';
import { UpdateVariantDto } from './dto/update.dto';
export declare class VariantService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createVariantDto: CreateVariantDto): Promise<{
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
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        productId: string;
        attributes: import("@prisma/client/runtime/library").JsonValue;
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
        stock: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lowStockThreshold: number | null;
            productId: string;
            quantity: number;
            expiryDate: Date | null;
            variantId: string | null;
            warehouseId: string;
        }[];
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            currency: string;
            type: import(".prisma/client").$Enums.PriceType;
            amount: number;
            validFrom: Date;
            validUntil: Date | null;
        }[];
        saleItems: {
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        productId: string;
        attributes: import("@prisma/client/runtime/library").JsonValue;
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
        stock: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lowStockThreshold: number | null;
            productId: string;
            quantity: number;
            expiryDate: Date | null;
            variantId: string | null;
            warehouseId: string;
        }[];
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            currency: string;
            type: import(".prisma/client").$Enums.PriceType;
            amount: number;
            validFrom: Date;
            validUntil: Date | null;
        }[];
        saleItems: {
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        productId: string;
        attributes: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: string, updateVariantDto: UpdateVariantDto): Promise<{
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
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        productId: string;
        attributes: import("@prisma/client/runtime/library").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        sku: string;
        productId: string;
        attributes: import("@prisma/client/runtime/library").JsonValue;
    }>;
}

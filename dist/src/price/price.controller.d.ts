import { CreatePriceDto } from './dto/create.dto';
import { UpdatePriceDto } from './dto/update.dto';
import { PriceService } from './price.service';
export declare class PriceController {
    private readonly priceService;
    constructor(priceService: PriceService);
    create(createPriceDto: CreatePriceDto): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        variantId: string | null;
        currency: string;
        type: import(".prisma/client").$Enums.PriceType;
        amount: number;
        validFrom: Date;
        validUntil: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        variantId: string | null;
        currency: string;
        type: import(".prisma/client").$Enums.PriceType;
        amount: number;
        validFrom: Date;
        validUntil: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        variantId: string | null;
        currency: string;
        type: import(".prisma/client").$Enums.PriceType;
        amount: number;
        validFrom: Date;
        validUntil: Date | null;
    }>;
    update(id: string, updatePriceDto: UpdatePriceDto): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        variantId: string | null;
        currency: string;
        type: import(".prisma/client").$Enums.PriceType;
        amount: number;
        validFrom: Date;
        validUntil: Date | null;
    }>;
    remove(id: string): Promise<{
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
    }>;
}

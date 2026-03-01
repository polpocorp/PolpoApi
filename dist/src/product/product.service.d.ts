import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';
export declare class ProductService {
    private prisma;
    private readonly usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(createProductDto: CreateProductDto): Promise<{
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
    }>;
    findAll(): Promise<({
        purchaseOrders: {
            id: string;
            productId: string;
            quantity: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        subCategory: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        } | null;
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
        variants: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            productId: string;
            attributes: import("@prisma/client/runtime/library").JsonValue;
        }[];
        stock: ({
            warehouse: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                location: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lowStockThreshold: number | null;
            productId: string;
            quantity: number;
            expiryDate: Date | null;
            variantId: string | null;
            warehouseId: string;
        })[];
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
        customFields: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            type: import(".prisma/client").$Enums.FieldType;
            value: string;
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
        productMaterials: ({
            rawMaterial: {
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
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                sku: string;
                supplierId: string;
                lowStockThreshold: number | null;
                unitPrice: number;
                currency: string;
                unitOfMeasure: string;
                stockQuantity: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            quantity: number;
            unitOfMeasure: string;
            rawMaterialId: string;
        })[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        products: {
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
        }[];
        subCategories: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    pause(id: string, reason?: string): Promise<{
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
    }>;
    activate(id: string): Promise<{
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
    }>;
    discontinue(id: string, reason?: string): Promise<{
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
    }>;
    togglePause(id: string, reasonForPause?: string): Promise<{
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
    }>;
}

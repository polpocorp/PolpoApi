import { ProductStatus } from '@prisma/client';
export declare class CreateProductDto {
    name: string;
    description?: string;
    sku: string;
    categoryId: string;
    subCategoryId?: string | null;
    images?: string[];
    supplierId?: string | null;
    createdById: string;
    createdAt?: string;
    updatedAt?: string;
    variants?: any[];
    stock?: string[];
    prices?: any[];
    customFields?: any[];
    purchaseOrders?: any[];
    saleItems?: any[];
    productMaterials?: any[];
    status?: ProductStatus;
    statusReason?: string | null;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    sku?: string;
    categoryId?: string;
    subCategoryId?: string | null;
    supplierId?: string | null;
    images?: string[];
    status?: ProductStatus;
    statusReason?: string | null;
}

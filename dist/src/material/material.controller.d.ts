import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-productMaterial.dto';
import { UpdateMaterialDto } from './dto/update-productMaterial.dto';
export declare class MaterialController {
    private readonly materialService;
    constructor(materialService: MaterialService);
    create(createMaterialDto: CreateMaterialDto): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        unitOfMeasure: string;
        rawMaterialId: string;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        unitOfMeasure: string;
        rawMaterialId: string;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        unitOfMeasure: string;
        rawMaterialId: string;
    }>;
    update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        unitOfMeasure: string;
        rawMaterialId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        unitOfMeasure: string;
        rawMaterialId: string;
    }>;
}

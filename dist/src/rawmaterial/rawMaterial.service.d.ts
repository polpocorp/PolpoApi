import { PrismaService } from '../prisma/prisma.service';
import { CreateRawMaterialDto } from './dto/create-rawmaterial.dto';
import { UpdateRawMaterialDto } from './dto/update-rawmaterial.dto';
import { UsersService } from 'src/users/users.service';
export declare class RawMaterialService {
    private prisma;
    private readonly usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(createRawMaterialDto: CreateRawMaterialDto): Promise<{
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
    }>;
    findAll(): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateRawMaterialDto: UpdateRawMaterialDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateStockMovementDto } from './dto/create.dto';
import { UpdateStockMovementDto } from './dto/update.dto';
export declare class StockMovementService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createStockMovementDto: CreateStockMovementDto): Promise<{
        warehouse: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            location: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        quantity: number;
        warehouseId: string;
        type: import(".prisma/client").$Enums.MovementType;
        stockId: string;
        reason: string | null;
    }>;
    findAll(): Promise<({
        warehouse: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            location: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        quantity: number;
        warehouseId: string;
        type: import(".prisma/client").$Enums.MovementType;
        stockId: string;
        reason: string | null;
    })[]>;
    findOne(id: string): Promise<{
        warehouse: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            location: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        quantity: number;
        warehouseId: string;
        type: import(".prisma/client").$Enums.MovementType;
        stockId: string;
        reason: string | null;
    }>;
    update(id: string, updateStockMovementDto: UpdateStockMovementDto): Promise<{
        warehouse: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            location: string;
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
        };
    } & {
        id: string;
        createdAt: Date;
        quantity: number;
        warehouseId: string;
        type: import(".prisma/client").$Enums.MovementType;
        stockId: string;
        reason: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        warehouseId: string;
        type: import(".prisma/client").$Enums.MovementType;
        stockId: string;
        reason: string | null;
    }>;
}

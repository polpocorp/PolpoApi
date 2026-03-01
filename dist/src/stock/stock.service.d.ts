import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto/createStock.dto';
import { UpdateStockDto } from './dto/updateStock.dto';
export declare class StockService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createStockDto: CreateStockDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        lowStockThreshold: number | null;
        productId: string;
        quantity: number;
        expiryDate: Date | null;
        variantId: string | null;
        warehouseId: string;
    }>;
    findAll(): Promise<({
        stockMovements: {
            id: string;
            createdAt: Date;
            quantity: number;
            warehouseId: string;
            type: import(".prisma/client").$Enums.MovementType;
            stockId: string;
            reason: string | null;
        }[];
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
    })[]>;
    findOne(id: string): Promise<{
        stockMovements: {
            id: string;
            createdAt: Date;
            quantity: number;
            warehouseId: string;
            type: import(".prisma/client").$Enums.MovementType;
            stockId: string;
            reason: string | null;
        }[];
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
    }>;
    update(id: string, updateStockDto: UpdateStockDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        lowStockThreshold: number | null;
        productId: string;
        quantity: number;
        expiryDate: Date | null;
        variantId: string | null;
        warehouseId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        lowStockThreshold: number | null;
        productId: string;
        quantity: number;
        expiryDate: Date | null;
        variantId: string | null;
        warehouseId: string;
    }>;
}

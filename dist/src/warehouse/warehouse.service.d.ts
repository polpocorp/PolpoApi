import { PrismaService } from '../prisma/prisma.service';
import { CreateWarehouseDto } from './dto/createWarehouse.dto';
import { UpdateWarehouseDto } from './dto/updateWarehouse.dto';
export declare class warehouseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createWarehouseDto: CreateWarehouseDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
    }>;
    findAll(): Promise<({
        stocks: {
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
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
    })[]>;
    findOne(id: string): Promise<{
        stocks: {
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
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
    }>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        location: string;
    }>;
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateDynamicObjectDto } from './dto/create-dynamic-object.dto';
import { UpdateDynamicObjectDto } from './dto/update-dynamic-object.dto';
import { Prisma, DynamicObject } from '@prisma/client';
export declare class DynamicObjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateDynamicObjectDto, createdById: string): Promise<DynamicObject>;
    findAll(): Promise<({
        _count: {
            records: number;
        };
        createdBy: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        createdById: string;
        slug: string;
        icon: string | null;
        color: string | null;
        fields: Prisma.JsonValue;
    })[]>;
    findOne(id: string): Promise<DynamicObject & {
        createdBy?: any;
        records?: any;
    }>;
    update(id: string, updateDto: UpdateDynamicObjectDto, userId: string): Promise<DynamicObject>;
    remove(id: string): Promise<DynamicObject>;
    getFields(id: string): Promise<Prisma.JsonArray>;
}

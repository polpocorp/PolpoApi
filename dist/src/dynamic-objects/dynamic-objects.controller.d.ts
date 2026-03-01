import { DynamicObjectsService } from './dynamic-objects.service';
import { CreateDynamicObjectDto } from './dto/create-dynamic-object.dto';
import { UpdateDynamicObjectDto } from './dto/update-dynamic-object.dto';
export declare class DynamicObjectsController {
    private readonly dynamicObjectsService;
    constructor(dynamicObjectsService: DynamicObjectsService);
    create(createDto: CreateDynamicObjectDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        createdById: string;
        slug: string;
        icon: string | null;
        color: string | null;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
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
        fields: import("@prisma/client/runtime/library").JsonValue;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        createdById: string;
        slug: string;
        icon: string | null;
        color: string | null;
        fields: import("@prisma/client/runtime/library").JsonValue;
    } & {
        createdBy?: any;
        records?: any;
    }>;
    update(id: string, updateDto: UpdateDynamicObjectDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        createdById: string;
        slug: string;
        icon: string | null;
        color: string | null;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        createdById: string;
        slug: string;
        icon: string | null;
        color: string | null;
        fields: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getFields(id: string): Promise<import("@prisma/client/runtime/library").JsonArray>;
}

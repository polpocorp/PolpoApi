export interface DynamicObject {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    color?: string | null;
    fields: DynamicFieldDefinition[];
    createdById: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    createdBy?: {
        id: string;
        name: string;
        email: string;
    } | null;
    _count?: {
        records: number;
    };
}
export interface DynamicFieldDefinition {
    name: string;
    type: 'TEXT' | 'NUMBER' | 'DATE' | 'BOOLEAN';
    required?: boolean;
    defaultValue?: any;
}

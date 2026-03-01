declare class FieldDefinitionDto {
    name: string;
    type: string;
    required?: boolean;
    defaultValue?: any;
}
export declare class CreateDynamicObjectDto {
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    fields: FieldDefinitionDto[];
}
export {};

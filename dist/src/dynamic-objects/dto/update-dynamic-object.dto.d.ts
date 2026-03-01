import { DynamicFieldDefinition } from '../interfaces/dynamic-object.interface';
export declare class UpdateDynamicObjectDto {
    name?: string;
    slug?: string;
    description?: string;
    icon?: string;
    color?: string;
    fields?: DynamicFieldDefinition[];
}

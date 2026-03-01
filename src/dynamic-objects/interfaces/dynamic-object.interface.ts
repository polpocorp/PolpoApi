// src/dynamic-objects/interfaces/dynamic-object.interface.ts

export interface DynamicObject {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;

  /** Array de campos definidos por el usuario */
  fields: DynamicFieldDefinition[];

  createdById: string;
  createdAt: Date | string; // Prisma devuelve Date, pero en JSON suele ser string
  updatedAt: Date | string;

  // Opcionales si los incluyes en el include del query
  createdBy?: {
    id: string;
    name: string;
    email: string;
  } | null;

  _count?: {
    records: number;
  };
}

// Definición de cada campo que el usuario configura
export interface DynamicFieldDefinition {
  name: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'BOOLEAN';
  required?: boolean;
  defaultValue?: any; // string | number | boolean | null | undefined
  // Podrías agregar más en el futuro: min, max, options (para select), etc.
}

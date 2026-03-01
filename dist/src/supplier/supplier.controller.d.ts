import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierService } from './supplier.service';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        state: string | null;
        city: string | null;
        numberStreet: string | null;
        paymentTerms: string | null;
        productsSupplied: string[];
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        state: string | null;
        city: string | null;
        numberStreet: string | null;
        paymentTerms: string | null;
        productsSupplied: string[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        state: string | null;
        city: string | null;
        numberStreet: string | null;
        paymentTerms: string | null;
        productsSupplied: string[];
    }>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        state: string | null;
        city: string | null;
        numberStreet: string | null;
        paymentTerms: string | null;
        productsSupplied: string[];
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        state: string | null;
        city: string | null;
        numberStreet: string | null;
        paymentTerms: string | null;
        productsSupplied: string[];
    }>;
}

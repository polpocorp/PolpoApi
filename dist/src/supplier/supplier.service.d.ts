import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { UsersService } from 'src/users/users.service';
export declare class SupplierService {
    private prisma;
    private readonly usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
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

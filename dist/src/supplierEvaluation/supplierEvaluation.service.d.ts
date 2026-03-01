import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierEvaluationDto } from './dto/create.dto';
import { UpdateSupplierEvaluationDto } from './dto/update.dto';
export declare class SupplierEvaluationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSupplierEvaluationDto: CreateSupplierEvaluationDto): Promise<{
        supplier: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        supplierId: string;
        deliveryTime: number | null;
        qualityRating: number | null;
        priceCompetitiveness: number | null;
        comments: string | null;
    }>;
    findAll(): Promise<({
        supplier: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        supplierId: string;
        deliveryTime: number | null;
        qualityRating: number | null;
        priceCompetitiveness: number | null;
        comments: string | null;
    })[]>;
    findOne(id: string): Promise<{
        supplier: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        supplierId: string;
        deliveryTime: number | null;
        qualityRating: number | null;
        priceCompetitiveness: number | null;
        comments: string | null;
    }>;
    update(id: string, updateSupplierEvaluationDto: UpdateSupplierEvaluationDto): Promise<{
        supplier: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        supplierId: string;
        deliveryTime: number | null;
        qualityRating: number | null;
        priceCompetitiveness: number | null;
        comments: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        supplierId: string;
        deliveryTime: number | null;
        qualityRating: number | null;
        priceCompetitiveness: number | null;
        comments: string | null;
    }>;
}

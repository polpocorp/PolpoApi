"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierEvaluationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SupplierEvaluationService = class SupplierEvaluationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSupplierEvaluationDto) {
        try {
            return await this.prisma.supplierEvaluation.create({
                data: {
                    supplierId: createSupplierEvaluationDto.supplierId,
                    deliveryTime: createSupplierEvaluationDto.deliveryTime,
                    qualityRating: createSupplierEvaluationDto.qualityRating,
                    priceCompetitiveness: createSupplierEvaluationDto.priceCompetitiveness,
                    comments: createSupplierEvaluationDto.comments,
                },
                include: { supplier: true },
            });
        }
        catch (error) {
            console.error('Error creating supplier evaluation:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.supplierEvaluation.findMany({
            include: { supplier: true },
        });
        return response;
    }
    async findOne(id) {
        const supplierEvaluation = await this.prisma.supplierEvaluation.findUnique({
            where: { id },
            include: { supplier: true },
        });
        if (!supplierEvaluation) {
            throw new common_1.NotFoundException(`SupplierEvaluation with ID ${id} not found`);
        }
        return supplierEvaluation;
    }
    async update(id, updateSupplierEvaluationDto) {
        const supplierEvaluation = await this.prisma.supplierEvaluation.findUnique({
            where: { id },
        });
        if (!supplierEvaluation) {
            throw new common_1.NotFoundException(`SupplierEvaluation with ID ${id} not found`);
        }
        return this.prisma.supplierEvaluation.update({
            where: { id },
            data: {
                deliveryTime: updateSupplierEvaluationDto.deliveryTime,
                qualityRating: updateSupplierEvaluationDto.qualityRating,
                priceCompetitiveness: updateSupplierEvaluationDto.priceCompetitiveness,
                comments: updateSupplierEvaluationDto.comments,
            },
            include: { supplier: true },
        });
    }
    async remove(id) {
        const supplierEvaluation = await this.prisma.supplierEvaluation.findUnique({
            where: { id },
        });
        if (!supplierEvaluation) {
            throw new common_1.NotFoundException(`SupplierEvaluation with ID ${id} not found`);
        }
        return this.prisma.supplierEvaluation.delete({ where: { id } });
    }
};
exports.SupplierEvaluationService = SupplierEvaluationService;
exports.SupplierEvaluationService = SupplierEvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupplierEvaluationService);
//# sourceMappingURL=supplierEvaluation.service.js.map
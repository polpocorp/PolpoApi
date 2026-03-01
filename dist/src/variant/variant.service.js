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
exports.VariantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VariantService = class VariantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createVariantDto) {
        try {
            return await this.prisma.variant.create({
                data: {
                    productId: createVariantDto.productId,
                    name: createVariantDto.name,
                    sku: createVariantDto.sku,
                    attributes: createVariantDto.attributes,
                },
                include: { product: true },
            });
        }
        catch (error) {
            console.error('Error creating variant:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.variant.findMany({
            include: { product: true, stock: true, prices: true, saleItems: true },
        });
        return response;
    }
    async findOne(id) {
        const variant = await this.prisma.variant.findUnique({
            where: { id },
            include: { product: true, stock: true, prices: true, saleItems: true },
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Variant with ID ${id} not found`);
        }
        return variant;
    }
    async update(id, updateVariantDto) {
        const variant = await this.prisma.variant.findUnique({
            where: { id },
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Variant with ID ${id} not found`);
        }
        return this.prisma.variant.update({
            where: { id },
            data: {
                name: updateVariantDto.name,
                sku: updateVariantDto.sku,
                attributes: updateVariantDto.attributes,
            },
            include: { product: true },
        });
    }
    async remove(id) {
        const variant = await this.prisma.variant.findUnique({
            where: { id },
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Variant with ID ${id} not found`);
        }
        return this.prisma.variant.delete({ where: { id } });
    }
};
exports.VariantService = VariantService;
exports.VariantService = VariantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VariantService);
//# sourceMappingURL=variant.service.js.map
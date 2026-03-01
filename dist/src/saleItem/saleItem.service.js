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
exports.SaleItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SaleItemService = class SaleItemService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSaleItemDto) {
        try {
            return await this.prisma.saleItem.create({
                data: {
                    saleId: createSaleItemDto.saleId,
                    productId: createSaleItemDto.productId,
                    variantId: createSaleItemDto.variantId,
                    quantity: createSaleItemDto.quantity,
                    unitPrice: createSaleItemDto.unitPrice,
                },
                include: { sale: true, product: true, variant: true },
            });
        }
        catch (error) {
            console.error('Error creating sale item:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.saleItem.findMany({
            include: { sale: true, product: true, variant: true },
        });
        return response;
    }
    async findOne(id) {
        const saleItem = await this.prisma.saleItem.findUnique({
            where: { id },
            include: { sale: true, product: true, variant: true },
        });
        if (!saleItem) {
            throw new common_1.NotFoundException(`SaleItem with ID ${id} not found`);
        }
        return saleItem;
    }
    async update(id, updateSaleItemDto) {
        const saleItem = await this.prisma.saleItem.findUnique({
            where: { id },
        });
        if (!saleItem) {
            throw new common_1.NotFoundException(`SaleItem with ID ${id} not found`);
        }
        return this.prisma.saleItem.update({
            where: { id },
            data: {
                quantity: updateSaleItemDto.quantity,
                unitPrice: updateSaleItemDto.unitPrice,
            },
            include: { sale: true, product: true, variant: true },
        });
    }
    async remove(id) {
        const saleItem = await this.prisma.saleItem.findUnique({
            where: { id },
        });
        if (!saleItem) {
            throw new common_1.NotFoundException(`SaleItem with ID ${id} not found`);
        }
        return this.prisma.saleItem.delete({ where: { id } });
    }
};
exports.SaleItemService = SaleItemService;
exports.SaleItemService = SaleItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleItemService);
//# sourceMappingURL=saleItem.service.js.map
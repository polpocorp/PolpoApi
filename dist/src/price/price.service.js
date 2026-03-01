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
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PriceService = class PriceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPriceDto) {
        try {
            return await this.prisma.price.create({
                data: {
                    productId: createPriceDto.productId,
                    variantId: createPriceDto.variantId,
                    type: createPriceDto.type,
                    amount: createPriceDto.amount,
                    currency: createPriceDto.currency || 'USD',
                    validFrom: createPriceDto.validFrom === null
                        ? new Date()
                        : createPriceDto.validFrom,
                    validUntil: createPriceDto.validUntil,
                },
                include: { product: true, variant: true },
            });
        }
        catch (error) {
            console.error('Error creating price:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.price.findMany({
            include: { product: true, variant: true },
        });
        return response;
    }
    async findOne(id) {
        const price = await this.prisma.price.findUnique({
            where: { id },
            include: { product: true, variant: true },
        });
        if (!price) {
            throw new common_1.NotFoundException(`Price with ID ${id} not found`);
        }
        return price;
    }
    async update(id, updatePriceDto) {
        const price = await this.prisma.price.findUnique({
            where: { id },
        });
        if (!price) {
            throw new common_1.NotFoundException(`Price with ID ${id} not found`);
        }
        return this.prisma.price.update({
            where: { id },
            data: {
                type: updatePriceDto.type,
                amount: updatePriceDto.amount,
                currency: updatePriceDto.currency,
                validFrom: updatePriceDto.validFrom,
                validUntil: updatePriceDto.validUntil,
            },
            include: { product: true, variant: true },
        });
    }
    async remove(id) {
        const price = await this.prisma.price.findUnique({
            where: { id },
        });
        if (!price) {
            throw new common_1.NotFoundException(`Price with ID ${id} not found`);
        }
        return this.prisma.price.delete({ where: { id } });
    }
};
exports.PriceService = PriceService;
exports.PriceService = PriceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PriceService);
//# sourceMappingURL=price.service.js.map
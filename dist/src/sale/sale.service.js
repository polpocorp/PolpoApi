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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let SaleService = class SaleService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createSaleDto) {
        try {
            return await this.prisma.sale.create({
                data: {
                    userId: createSaleDto.userId,
                    customerId: createSaleDto.customerId,
                    saleDate: createSaleDto.saleDate || new Date(),
                    totalAmount: createSaleDto.totalAmount,
                    paymentMethod: createSaleDto.paymentMethod,
                    status: createSaleDto.status,
                    items: {
                        create: createSaleDto.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                        })),
                    },
                },
                include: { items: true },
            });
        }
        catch (error) {
            console.error('Error creating sale:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.sale.findMany({
            include: { items: true, user: true, customer: true, invoice: true },
        });
        return response;
    }
    async findOne(id) {
        const sale = await this.prisma.sale.findUnique({
            where: { id },
            include: { items: true, user: true, customer: true, invoice: true },
        });
        if (!sale) {
            throw new common_1.NotFoundException(`Sale with ID ${id} not found`);
        }
        return sale;
    }
    async update(id, updateSaleDto) {
        const sale = await this.prisma.sale.findUnique({
            where: { id },
        });
        if (!sale) {
            throw new common_1.NotFoundException(`Sale with ID ${id} not found`);
        }
        return this.prisma.sale.update({
            where: { id },
            data: {
                customerId: updateSaleDto.customerId,
                saleDate: updateSaleDto.saleDate,
                totalAmount: updateSaleDto.totalAmount,
                paymentMethod: updateSaleDto.paymentMethod,
                status: updateSaleDto.status,
            },
        });
    }
    async remove(id) {
        const sale = await this.prisma.sale.findUnique({
            where: { id },
        });
        if (!sale) {
            throw new common_1.NotFoundException(`Sale with ID ${id} not found`);
        }
        return this.prisma.sale.delete({ where: { id } });
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], SaleService);
//# sourceMappingURL=sale.service.js.map
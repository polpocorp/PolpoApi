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
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let PurchaseOrderService = class PurchaseOrderService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createPurchaseOrderDto) {
        try {
            return await this.prisma.purchaseOrder.create({
                data: {
                    supplierId: createPurchaseOrderDto.supplierId,
                    createdById: createPurchaseOrderDto.createdById,
                    orderDate: createPurchaseOrderDto.orderDate || new Date(),
                    status: createPurchaseOrderDto.status,
                    totalAmount: createPurchaseOrderDto.totalAmount,
                    products: {
                        create: createPurchaseOrderDto.products.map((product) => ({
                            productId: product.productId,
                            quantity: product.quantity,
                            unitPrice: product.unitPrice,
                        })),
                    },
                },
                include: { supplier: true, createdBy: true, products: true },
            });
        }
        catch (error) {
            console.error('Error creating purchase order:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.purchaseOrder.findMany({
            include: { supplier: true, createdBy: true, products: true },
        });
        return response;
    }
    async findOne(id) {
        const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: { supplier: true, createdBy: true, products: true },
        });
        if (!purchaseOrder) {
            throw new common_1.NotFoundException(`PurchaseOrder with ID ${id} not found`);
        }
        return purchaseOrder;
    }
    async update(id, updatePurchaseOrderDto) {
        const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
            where: { id },
        });
        if (!purchaseOrder) {
            throw new common_1.NotFoundException(`PurchaseOrder with ID ${id} not found`);
        }
        return this.prisma.purchaseOrder.update({
            where: { id },
            data: {
                supplierId: updatePurchaseOrderDto.supplierId,
                orderDate: updatePurchaseOrderDto.orderDate,
                status: updatePurchaseOrderDto.status,
                totalAmount: updatePurchaseOrderDto.totalAmount,
            },
            include: { supplier: true, createdBy: true, products: true },
        });
    }
    async remove(id) {
        const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
            where: { id },
        });
        if (!purchaseOrder) {
            throw new common_1.NotFoundException(`PurchaseOrder with ID ${id} not found`);
        }
        return this.prisma.purchaseOrder.delete({ where: { id } });
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], PurchaseOrderService);
//# sourceMappingURL=purchaseOrder.service.js.map
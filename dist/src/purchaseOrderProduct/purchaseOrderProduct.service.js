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
exports.PurchaseOrderProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PurchaseOrderProductService = class PurchaseOrderProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPurchaseOrderProductDto) {
        try {
            return await this.prisma.purchaseOrderProduct.create({
                data: {
                    purchaseOrderId: createPurchaseOrderProductDto.purchaseOrderId,
                    productId: createPurchaseOrderProductDto.productId,
                    quantity: createPurchaseOrderProductDto.quantity,
                    unitPrice: createPurchaseOrderProductDto.unitPrice,
                },
                include: { purchaseOrder: true, product: true },
            });
        }
        catch (error) {
            console.error('Error creating purchase order product:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.purchaseOrderProduct.findMany({
            include: { purchaseOrder: true, product: true },
        });
        return response;
    }
    async findOne(id) {
        const purchaseOrderProduct = await this.prisma.purchaseOrderProduct.findUnique({
            where: { id },
            include: { purchaseOrder: true, product: true },
        });
        if (!purchaseOrderProduct) {
            throw new common_1.NotFoundException(`PurchaseOrderProduct with ID ${id} not found`);
        }
        return purchaseOrderProduct;
    }
    async update(id, updatePurchaseOrderProductDto) {
        const purchaseOrderProduct = await this.prisma.purchaseOrderProduct.findUnique({
            where: { id },
        });
        if (!purchaseOrderProduct) {
            throw new common_1.NotFoundException(`PurchaseOrderProduct with ID ${id} not found`);
        }
        return this.prisma.purchaseOrderProduct.update({
            where: { id },
            data: {
                quantity: updatePurchaseOrderProductDto.quantity,
                unitPrice: updatePurchaseOrderProductDto.unitPrice,
            },
            include: { purchaseOrder: true, product: true },
        });
    }
    async remove(id) {
        const purchaseOrderProduct = await this.prisma.purchaseOrderProduct.findUnique({
            where: { id },
        });
        if (!purchaseOrderProduct) {
            throw new common_1.NotFoundException(`PurchaseOrderProduct with ID ${id} not found`);
        }
        return this.prisma.purchaseOrderProduct.delete({ where: { id } });
    }
};
exports.PurchaseOrderProductService = PurchaseOrderProductService;
exports.PurchaseOrderProductService = PurchaseOrderProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PurchaseOrderProductService);
//# sourceMappingURL=purchaseOrderProduct.service.js.map
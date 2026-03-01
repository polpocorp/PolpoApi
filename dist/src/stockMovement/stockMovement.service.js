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
exports.StockMovementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StockMovementService = class StockMovementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStockMovementDto) {
        try {
            return await this.prisma.stockMovement.create({
                data: {
                    stockId: createStockMovementDto.stockId,
                    warehouseId: createStockMovementDto.warehouseId,
                    type: createStockMovementDto.type,
                    quantity: createStockMovementDto.quantity,
                    reason: createStockMovementDto.reason,
                },
                include: { stock: true, warehouse: true },
            });
        }
        catch (error) {
            console.error('Error creating stock movement:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.stockMovement.findMany({
            include: { stock: true, warehouse: true },
        });
        return response;
    }
    async findOne(id) {
        const stockMovement = await this.prisma.stockMovement.findUnique({
            where: { id },
            include: { stock: true, warehouse: true },
        });
        if (!stockMovement) {
            throw new common_1.NotFoundException(`StockMovement with ID ${id} not found`);
        }
        return stockMovement;
    }
    async update(id, updateStockMovementDto) {
        const stockMovement = await this.prisma.stockMovement.findUnique({
            where: { id },
        });
        if (!stockMovement) {
            throw new common_1.NotFoundException(`StockMovement with ID ${id} not found`);
        }
        return this.prisma.stockMovement.update({
            where: { id },
            data: {
                type: updateStockMovementDto.type,
                quantity: updateStockMovementDto.quantity,
                reason: updateStockMovementDto.reason,
            },
            include: { stock: true, warehouse: true },
        });
    }
    async remove(id) {
        const stockMovement = await this.prisma.stockMovement.findUnique({
            where: { id },
        });
        if (!stockMovement) {
            throw new common_1.NotFoundException(`StockMovement with ID ${id} not found`);
        }
        return this.prisma.stockMovement.delete({ where: { id } });
    }
};
exports.StockMovementService = StockMovementService;
exports.StockMovementService = StockMovementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockMovementService);
//# sourceMappingURL=stockMovement.service.js.map
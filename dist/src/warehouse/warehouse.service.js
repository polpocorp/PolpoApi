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
exports.warehouseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let warehouseService = class warehouseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createWarehouseDto) {
        return this.prisma.warehouse.create({
            data: {
                ...createWarehouseDto,
            },
        });
    }
    async findAll() {
        const response = this.prisma.warehouse.findMany({
            include: { stocks: true },
        });
        console.log('response ', JSON.stringify(response));
        return response;
    }
    async findOne(id) {
        const warehouse = await this.prisma.warehouse.findUnique({
            where: { id },
            include: { stocks: true },
        });
        if (!warehouse) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return warehouse;
    }
    async update(id, updateWarehouseDto) {
        const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
        if (!warehouse) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return this.prisma.warehouse.update({
            where: { id },
            data: updateWarehouseDto,
        });
    }
    async remove(id) {
        const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
        if (!warehouse) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return this.prisma.warehouse.delete({ where: { id } });
    }
};
exports.warehouseService = warehouseService;
exports.warehouseService = warehouseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], warehouseService);
//# sourceMappingURL=warehouse.service.js.map
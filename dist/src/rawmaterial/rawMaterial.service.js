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
exports.RawMaterialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let RawMaterialService = class RawMaterialService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createRawMaterialDto) {
        try {
            console.log('etoy hacienod el crate roa material dto', createRawMaterialDto);
            return await this.prisma.rawMaterial.create({
                data: {
                    ...createRawMaterialDto,
                    unitPrice: createRawMaterialDto.unitPrice,
                    unitOfMeasure: createRawMaterialDto.unitOfMeasure,
                    stockQuantity: createRawMaterialDto.stockQuantity,
                },
            });
        }
        catch (error) {
            console.error('Error creating raw material:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.rawMaterial.findMany();
        return response;
    }
    async findOne(id) {
        const rawMaterial = await this.prisma.rawMaterial.findUnique({
            where: { id },
        });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`RawMaterial with ID ${id} not found`);
        }
        return rawMaterial;
    }
    async update(id, updateRawMaterialDto) {
        const rawMaterial = await this.prisma.rawMaterial.findUnique({
            where: { id },
        });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`RawMaterial with ID ${id} not found`);
        }
        return this.prisma.rawMaterial.update({
            where: { id },
            data: updateRawMaterialDto,
        });
    }
    async remove(id) {
        const rawMaterial = await this.prisma.rawMaterial.findUnique({
            where: { id },
        });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`RawMaterial with ID ${id} not found`);
        }
        return this.prisma.rawMaterial.delete({ where: { id } });
    }
};
exports.RawMaterialService = RawMaterialService;
exports.RawMaterialService = RawMaterialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], RawMaterialService);
//# sourceMappingURL=rawMaterial.service.js.map
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
exports.MaterialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let MaterialService = class MaterialService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createMaterialDto) {
        try {
            return await this.prisma.productMaterial.create({
                data: {
                    ...createMaterialDto,
                },
                include: {
                    product: true,
                },
            });
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
    async findAll() {
        const response = this.prisma.productMaterial.findMany({
            include: {
                product: true,
            },
        });
        return response;
    }
    async findOne(id) {
        const productMaterial = await this.prisma.productMaterial.findUnique({
            where: { id },
            include: {
                product: true,
            },
        });
        if (!productMaterial) {
            throw new common_1.NotFoundException(`Product Material with ID ${id} not found`);
        }
        return productMaterial;
    }
    async update(id, updateCategoryDto) {
        const productMaterial = await this.prisma.productMaterial.findUnique({
            where: { id },
        });
        if (!productMaterial) {
            throw new common_1.NotFoundException(`Product Material with ID ${id} not found`);
        }
        return this.prisma.productMaterial.update({
            where: { id },
            data: updateCategoryDto,
        });
    }
    async remove(id) {
        const productMaterial = await this.prisma.productMaterial.findUnique({
            where: { id },
        });
        if (!productMaterial) {
            throw new common_1.NotFoundException(`Product Material with ID ${id} not found`);
        }
        return this.prisma.productMaterial.delete({ where: { id } });
    }
};
exports.MaterialService = MaterialService;
exports.MaterialService = MaterialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], MaterialService);
//# sourceMappingURL=material.service.js.map
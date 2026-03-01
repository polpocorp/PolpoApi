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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let ProductService = class ProductService {
    prisma;
    usersService;
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createProductDto) {
        try {
            return await this.prisma.product.create({
                data: {
                    name: createProductDto.name,
                    description: createProductDto.description,
                    sku: createProductDto.sku,
                    category: { connect: { id: createProductDto.categoryId } },
                    subCategory: createProductDto.subCategoryId
                        ? { connect: { id: createProductDto.subCategoryId } }
                        : undefined,
                    supplier: createProductDto.supplierId
                        ? { connect: { id: createProductDto.supplierId } }
                        : undefined,
                    images: createProductDto.images || [],
                    createdBy: { connect: { id: createProductDto.createdById || '' } },
                    createdAt: createProductDto.createdAt
                        ? new Date(createProductDto.createdAt)
                        : undefined,
                    updatedAt: createProductDto.updatedAt
                        ? new Date(createProductDto.updatedAt)
                        : undefined,
                },
            });
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.product.findMany({
            include: {
                category: true,
                subCategory: true,
                createdBy: true,
                variants: true,
                stock: {
                    include: {
                        warehouse: true,
                    },
                },
                prices: true,
                customFields: true,
                purchaseOrders: true,
                saleItems: true,
                productMaterials: {
                    include: {
                        rawMaterial: {
                            include: {
                                supplier: true,
                            },
                        },
                    },
                },
            },
        });
        return response;
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { products: true, subCategories: true },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return category;
    }
    async update(id, updateProductDto) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        if (product.isDeleted) {
            throw new common_1.BadRequestException('No se puede actualizar un producto eliminado');
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                ...updateProductDto,
            },
        });
    }
    async remove(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                saleItems: { take: 1 },
                purchaseOrders: { take: 1 },
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        if (product.saleItems.length > 0 || product.purchaseOrders.length > 0) {
            return this.prisma.product.update({
                where: { id },
                data: {
                    isDeleted: true,
                    deletedAt: new Date(),
                },
            });
        }
        return this.prisma.product.delete({ where: { id } });
    }
    async pause(id, reason) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            select: { id: true, status: true, isDeleted: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        if (product.isDeleted) {
            throw new common_1.BadRequestException('No se puede pausar un producto eliminado');
        }
        if (product.status === 'PAUSED') {
            throw new common_1.BadRequestException('El producto ya está pausado');
        }
        if (product.status === 'DISCONTINUED') {
            throw new common_1.BadRequestException('No se puede pausar un producto descontinuado');
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                status: 'PAUSED',
                statusChangedAt: new Date(),
                statusReason: reason || null,
            },
        });
    }
    async activate(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            select: { id: true, status: true, isDeleted: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        if (product.isDeleted) {
            throw new common_1.BadRequestException('No se puede activar un producto eliminado');
        }
        if (product.status === 'ACTIVE') {
            throw new common_1.BadRequestException('El producto ya está activo');
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                status: 'ACTIVE',
                statusChangedAt: new Date(),
                statusReason: null,
            },
        });
    }
    async discontinue(id, reason) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            select: { id: true, status: true, isDeleted: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        if (product.isDeleted) {
            throw new common_1.BadRequestException('No se puede descontinuar un producto eliminado');
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                status: 'DISCONTINUED',
                statusChangedAt: new Date(),
                statusReason: reason || 'Descontinuado por decisión administrativa',
            },
        });
    }
    async togglePause(id, reasonForPause) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            select: { status: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        if (product.status === 'ACTIVE') {
            return this.pause(id, reasonForPause);
        }
        else if (product.status === 'PAUSED') {
            return this.activate(id);
        }
        else {
            throw new common_1.BadRequestException(`No se puede alternar el estado desde ${product.status}`);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], ProductService);
//# sourceMappingURL=product.service.js.map
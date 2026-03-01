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
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubCategoryService = class SubCategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSubCategoryDto) {
        return this.prisma.subCategory.create({
            data: {
                name: createSubCategoryDto.name,
                categoryId: createSubCategoryDto.categoryId,
            },
        });
    }
    async findAll() {
        const response = await this.prisma.subCategory.findMany({
            include: { category: true, products: true },
        });
        console.log('response ', JSON.stringify(response));
        return response;
    }
    async findOne(id) {
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id },
            include: { category: true, products: true },
        });
        if (!subCategory) {
            throw new common_1.NotFoundException(`SubCategory with ID ${id} not found`);
        }
        return subCategory;
    }
    async update(id, updateSubCategoryDto) {
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id },
        });
        if (!subCategory) {
            throw new common_1.NotFoundException(`SubCategory with ID ${id} not found`);
        }
        return this.prisma.subCategory.update({
            where: { id },
            data: updateSubCategoryDto,
        });
    }
    async remove(id) {
        const subCategory = await this.prisma.subCategory.findUnique({
            where: { id },
        });
        if (!subCategory) {
            throw new common_1.NotFoundException(`SubCategory with ID ${id} not found`);
        }
        return this.prisma.subCategory.delete({ where: { id } });
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubCategoryService);
//# sourceMappingURL=subCategory.service.js.map
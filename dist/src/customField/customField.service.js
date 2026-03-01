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
exports.CustomFieldService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomFieldService = class CustomFieldService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCustomFieldDto) {
        try {
            return await this.prisma.customField.create({
                data: {
                    productId: createCustomFieldDto.productId,
                    name: createCustomFieldDto.name,
                    value: createCustomFieldDto.value,
                    type: createCustomFieldDto.type,
                },
                include: { product: true },
            });
        }
        catch (error) {
            console.error('Error creating custom field:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.customField.findMany({
            include: { product: true },
        });
        return response;
    }
    async findOne(id) {
        const customField = await this.prisma.customField.findUnique({
            where: { id },
            include: { product: true },
        });
        if (!customField) {
            throw new common_1.NotFoundException(`CustomField with ID ${id} not found`);
        }
        return customField;
    }
    async update(id, updateCustomFieldDto) {
        const customField = await this.prisma.customField.findUnique({
            where: { id },
        });
        if (!customField) {
            throw new common_1.NotFoundException(`CustomField with ID ${id} not found`);
        }
        return this.prisma.customField.update({
            where: { id },
            data: {
                name: updateCustomFieldDto.name,
                value: updateCustomFieldDto.value,
                type: updateCustomFieldDto.type,
            },
            include: { product: true },
        });
    }
    async remove(id) {
        const customField = await this.prisma.customField.findUnique({
            where: { id },
        });
        if (!customField) {
            throw new common_1.NotFoundException(`CustomField with ID ${id} not found`);
        }
        return this.prisma.customField.delete({ where: { id } });
    }
};
exports.CustomFieldService = CustomFieldService;
exports.CustomFieldService = CustomFieldService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomFieldService);
//# sourceMappingURL=customField.service.js.map
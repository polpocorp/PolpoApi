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
exports.DynamicObjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DynamicObjectsService = class DynamicObjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto, createdById) {
        const existing = await this.prisma.dynamicObject.findUnique({
            where: { slug: createDto.slug },
        });
        if (existing) {
            throw new common_1.BadRequestException('El slug ya está en uso');
        }
        console.log({ createDto });
        return this.prisma.dynamicObject.create({
            data: {
                name: createDto.name,
                slug: createDto.slug,
                description: createDto.description,
                fields: createDto.fields,
                color: createDto.color,
                createdBy: {
                    connect: { id: createdById },
                },
            },
            include: {
                createdBy: {
                    select: { id: true, name: true, email: true },
                },
            },
        });
    }
    async findAll() {
        const response = await this.prisma.dynamicObject.findMany({
            where: {},
            include: {
                createdBy: { select: { id: true, name: true } },
                _count: { select: { records: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        console.log({ response });
        return this.prisma.dynamicObject.findMany({
            where: {},
            include: {
                createdBy: { select: { id: true, name: true } },
                _count: { select: { records: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const obj = await this.prisma.dynamicObject.findUnique({
            where: { id },
            include: {
                createdBy: { select: { id: true, name: true, email: true } },
                records: { take: 1 },
            },
        });
        if (!obj) {
            throw new common_1.NotFoundException(`DynamicObject con id ${id} no encontrado`);
        }
        return obj;
    }
    async update(id, updateDto, userId) {
        await this.findOne(id);
        return this.prisma.dynamicObject.update({
            where: { id },
            data: {
                name: updateDto.name,
                ...(updateDto.fields !== undefined && {
                    fields: updateDto.fields,
                }),
                color: updateDto.color,
            },
            include: {
                createdBy: {
                    select: { id: true, name: true },
                },
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.dynamicObject.delete({
            where: { id },
        });
    }
    async getFields(id) {
        const obj = await this.prisma.dynamicObject.findUnique({
            where: { id },
            select: { fields: true },
        });
        if (!obj) {
            throw new common_1.NotFoundException(`DynamicObject con id ${id} no encontrado`);
        }
        return obj.fields;
    }
};
exports.DynamicObjectsService = DynamicObjectsService;
exports.DynamicObjectsService = DynamicObjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DynamicObjectsService);
//# sourceMappingURL=dynamic-objects.service.js.map
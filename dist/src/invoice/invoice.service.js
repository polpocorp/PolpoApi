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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvoiceService = class InvoiceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createInvoiceDto) {
        try {
            return await this.prisma.invoice.create({
                data: {
                    saleId: createInvoiceDto.saleId,
                    invoiceNumber: createInvoiceDto.invoiceNumber,
                    issueDate: createInvoiceDto.issueDate || new Date(),
                    totalAmount: createInvoiceDto.totalAmount,
                    taxAmount: createInvoiceDto.taxAmount,
                },
                include: { sale: true },
            });
        }
        catch (error) {
            console.error('Error creating invoice:', error);
            throw error;
        }
    }
    async findAll() {
        const response = await this.prisma.invoice.findMany({
            include: { sale: true },
        });
        return response;
    }
    async findOne(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { sale: true },
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return invoice;
    }
    async update(id, updateInvoiceDto) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return this.prisma.invoice.update({
            where: { id },
            data: {
                invoiceNumber: updateInvoiceDto.invoiceNumber,
                issueDate: updateInvoiceDto.issueDate,
                totalAmount: updateInvoiceDto.totalAmount,
                taxAmount: updateInvoiceDto.taxAmount,
            },
            include: { sale: true },
        });
    }
    async remove(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with ID ${id} not found`);
        }
        return this.prisma.invoice.delete({ where: { id } });
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map
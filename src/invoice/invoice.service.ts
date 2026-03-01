import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create.dto';
import { UpdateInvoiceDto } from './dto/update.dto';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      return await this.prisma.invoice.create({
        data: {
          saleId: createInvoiceDto.saleId,
          invoiceNumber: createInvoiceDto.invoiceNumber,
          issueDate: createInvoiceDto.issueDate || new Date(),
          totalAmount: createInvoiceDto.totalAmount,
          taxAmount: createInvoiceDto.taxAmount,
        },
        include: { sale: true }, // Include related sale
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.invoice.findMany({
      include: { sale: true },
    });
    return response;
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { sale: true },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
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

  async remove(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return this.prisma.invoice.delete({ where: { id } });
  }
}

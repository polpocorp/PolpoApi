import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleItemDto } from './dto/create.dto';
import { UpdateSaleItemDto } from './dto/update.dto';

@Injectable()
export class SaleItemService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleItemDto: CreateSaleItemDto) {
    try {
      return await this.prisma.saleItem.create({
        data: {
          saleId: createSaleItemDto.saleId,
          productId: createSaleItemDto.productId,
          variantId: createSaleItemDto.variantId,
          quantity: createSaleItemDto.quantity,
          unitPrice: createSaleItemDto.unitPrice,
        },
        include: { sale: true, product: true, variant: true }, // Include related sale, product, and variant
      });
    } catch (error) {
      console.error('Error creating sale item:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.saleItem.findMany({
      include: { sale: true, product: true, variant: true },
    });
    return response;
  }

  async findOne(id: string) {
    const saleItem = await this.prisma.saleItem.findUnique({
      where: { id },
      include: { sale: true, product: true, variant: true },
    });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found`);
    }
    return saleItem;
  }

  async update(id: string, updateSaleItemDto: UpdateSaleItemDto) {
    const saleItem = await this.prisma.saleItem.findUnique({
      where: { id },
    });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found`);
    }
    return this.prisma.saleItem.update({
      where: { id },
      data: {
        quantity: updateSaleItemDto.quantity,
        unitPrice: updateSaleItemDto.unitPrice,
      },
      include: { sale: true, product: true, variant: true },
    });
  }

  async remove(id: string) {
    const saleItem = await this.prisma.saleItem.findUnique({
      where: { id },
    });
    if (!saleItem) {
      throw new NotFoundException(`SaleItem with ID ${id} not found`);
    }
    return this.prisma.saleItem.delete({ where: { id } });
  }
}

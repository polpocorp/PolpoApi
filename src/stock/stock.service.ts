import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto/createStock.dto';
import { UpdateStockDto } from './dto/updateStock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async create(createStockDto: CreateStockDto) {
    return this.prisma.stock.create({
      data: {
        ...createStockDto,
      },
    });
  }

  async findAll() {
    const response = this.prisma.stock.findMany({
      include: { stockMovements: true },
    });
    console.log('response ', JSON.stringify(response));
    return response;
  }

  async findOne(id: string) {
    const stock = await this.prisma.stock.findUnique({
      where: { id },
      include: { stockMovements: true },
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    const stock = await this.prisma.stock.findUnique({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.prisma.stock.update({
      where: { id },
      data: updateStockDto,
    });
  }

  async remove(id: string) {
    const stock = await this.prisma.stock.findUnique({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.prisma.stock.delete({ where: { id } });
  }
}

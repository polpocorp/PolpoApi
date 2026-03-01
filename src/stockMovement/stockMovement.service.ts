import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockMovementDto } from './dto/create.dto';
import { UpdateStockMovementDto } from './dto/update.dto';

@Injectable()
export class StockMovementService {
  constructor(private prisma: PrismaService) {}

  async create(createStockMovementDto: CreateStockMovementDto) {
    try {
      return await this.prisma.stockMovement.create({
        data: {
          stockId: createStockMovementDto.stockId,
          warehouseId: createStockMovementDto.warehouseId,
          type: createStockMovementDto.type as any,
          quantity: createStockMovementDto.quantity,
          reason: createStockMovementDto.reason,
        },
        include: { stock: true, warehouse: true }, // Include related stock and warehouse
      });
    } catch (error) {
      console.error('Error creating stock movement:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.stockMovement.findMany({
      include: { stock: true, warehouse: true },
    });
    return response;
  }

  async findOne(id: string) {
    const stockMovement = await this.prisma.stockMovement.findUnique({
      where: { id },
      include: { stock: true, warehouse: true },
    });
    if (!stockMovement) {
      throw new NotFoundException(`StockMovement with ID ${id} not found`);
    }
    return stockMovement;
  }

  async update(id: string, updateStockMovementDto: UpdateStockMovementDto) {
    const stockMovement = await this.prisma.stockMovement.findUnique({
      where: { id },
    });
    if (!stockMovement) {
      throw new NotFoundException(`StockMovement with ID ${id} not found`);
    }
    return this.prisma.stockMovement.update({
      where: { id },
      data: {
        type: updateStockMovementDto.type as any,
        quantity: updateStockMovementDto.quantity,
        reason: updateStockMovementDto.reason,
      },
      include: { stock: true, warehouse: true },
    });
  }

  async remove(id: string) {
    const stockMovement = await this.prisma.stockMovement.findUnique({
      where: { id },
    });
    if (!stockMovement) {
      throw new NotFoundException(`StockMovement with ID ${id} not found`);
    }
    return this.prisma.stockMovement.delete({ where: { id } });
  }
}

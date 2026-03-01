import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { stringify } from 'querystring';
import { CreateWarehouseDto } from './dto/createWarehouse.dto';
import { UpdateWarehouseDto } from './dto/updateWarehouse.dto';

@Injectable()
export class warehouseService {
  constructor(private prisma: PrismaService) {}

  async create(createWarehouseDto: CreateWarehouseDto) {
    return this.prisma.warehouse.create({
      data: {
        ...createWarehouseDto,
      },
    });
  }

  async findAll() {
    const response = this.prisma.warehouse.findMany({
      include: { stocks: true },
    });
    console.log('response ', JSON.stringify(response));
    return response;
  }

  async findOne(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
      include: { stocks: true },
    });
    if (!warehouse) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return warehouse;
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
    if (!warehouse) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prisma.warehouse.update({
      where: { id },
      data: updateWarehouseDto,
    });
  }

  async remove(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
    if (!warehouse) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.prisma.warehouse.delete({ where: { id } });
  }
}

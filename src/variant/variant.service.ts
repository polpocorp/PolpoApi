import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVariantDto } from './dto/create.dto';
import { UpdateVariantDto } from './dto/update.dto';

@Injectable()
export class VariantService {
  constructor(private prisma: PrismaService) {}

  async create(createVariantDto: CreateVariantDto) {
    try {
      return await this.prisma.variant.create({
        data: {
          productId: createVariantDto.productId,
          name: createVariantDto.name,
          sku: createVariantDto.sku,
          attributes: createVariantDto.attributes,
        },
        include: { product: true }, // Include related product in the response
      });
    } catch (error) {
      console.error('Error creating variant:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.variant.findMany({
      include: { product: true, stock: true, prices: true, saleItems: true },
    });
    return response;
  }

  async findOne(id: string) {
    const variant = await this.prisma.variant.findUnique({
      where: { id },
      include: { product: true, stock: true, prices: true, saleItems: true },
    });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return variant;
  }

  async update(id: string, updateVariantDto: UpdateVariantDto) {
    const variant = await this.prisma.variant.findUnique({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return this.prisma.variant.update({
      where: { id },
      data: {
        name: updateVariantDto.name,
        sku: updateVariantDto.sku,
        attributes: updateVariantDto.attributes,
      },
      include: { product: true },
    });
  }

  async remove(id: string) {
    const variant = await this.prisma.variant.findUnique({
      where: { id },
    });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return this.prisma.variant.delete({ where: { id } });
  }
}

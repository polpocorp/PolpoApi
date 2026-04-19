import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePriceDto } from './dto/create.dto';
import { UpdatePriceDto } from './dto/update.dto';

@Injectable()
export class PriceService {
  constructor(private prisma: PrismaService) {}

  async create(createPriceDto: CreatePriceDto) {
    try {
      return await this.prisma.price.create({
        data: {
          productId: createPriceDto.productId,
          variantId: createPriceDto.variantId,
          type: createPriceDto.type as any,
          amount: createPriceDto.amount,
          currency: createPriceDto.currency || 'USD',
          validFrom:
            createPriceDto.validFrom === null
              ? new Date()
              : createPriceDto.validFrom,
          validUntil: createPriceDto.validUntil,
        },
        include: { product: true, variant: true }, // Include related product and variant
      });
    } catch (error) {
      console.error('Error creating price:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.price.findMany({
      include: { product: true, variant: true },
    });
    return response;
  }

  async findOne(id: string) {
    const price = await this.prisma.price.findUnique({
      where: { id },
      include: { product: true, variant: true },
    });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return price;
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    const price = await this.prisma.price.findUnique({
      where: { id },
    });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return this.prisma.price.update({
      where: { id },
      data: {
        type: updatePriceDto.type as any,
        amount: updatePriceDto.amount,
        currency: updatePriceDto.currency,
        validFrom: updatePriceDto.validFrom,
        validUntil: updatePriceDto.validUntil,
      },
      include: { product: true, variant: true },
    });
  }

  async remove(id: string) {
    const price = await this.prisma.price.findUnique({
      where: { id },
    });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return this.prisma.price.delete({ where: { id } });
  }
}

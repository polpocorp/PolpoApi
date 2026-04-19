import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto/create.dto';
import { UpdateSaleDto } from './dto/update.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class SaleService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService, // Retained for potential user-related logic
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    try {
      return await this.prisma.sale.create({
        data: {
          userId: createSaleDto.userId,
          customerId: createSaleDto.customerId,
          saleDate: createSaleDto.saleDate || new Date(),
          totalAmount: createSaleDto.totalAmount,
          paymentMethod: createSaleDto.paymentMethod as any, // Cast to PaymentMethod enum
          status: createSaleDto.status as any,
          items: {
            create: createSaleDto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          },
        },
        include: { items: true }, // Include related items in the response
      });
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.sale.findMany({
      include: { items: true, user: true, customer: true, invoice: true },
    });
    return response;
  }

  async findOne(id: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { items: true, user: true, customer: true, invoice: true },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return this.prisma.sale.update({
      where: { id },
      data: {
        customerId: updateSaleDto.customerId,
        saleDate: updateSaleDto.saleDate,
        totalAmount: updateSaleDto.totalAmount,
        paymentMethod: updateSaleDto.paymentMethod as any,
        status: updateSaleDto.status as any,
      },
    });
  }

  async remove(id: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return this.prisma.sale.delete({ where: { id } });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseOrderDto } from './dto/create.dto';
import { UpdatePurchaseOrderDto } from './dto/update.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    try {
      return await this.prisma.purchaseOrder.create({
        data: {
          supplierId: createPurchaseOrderDto.supplierId,
          createdById: createPurchaseOrderDto.createdById,
          orderDate: createPurchaseOrderDto.orderDate || new Date(),
          status: createPurchaseOrderDto.status as any,
          totalAmount: createPurchaseOrderDto.totalAmount,
          products: {
            create: createPurchaseOrderDto.products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
              unitPrice: product.unitPrice,
            })),
          },
        },
        include: { supplier: true, createdBy: true, products: true },
      });
    } catch (error) {
      console.error('Error creating purchase order:', error);
      throw error;
    }
  }

  async findAll() {
    const response = await this.prisma.purchaseOrder.findMany({
      include: { supplier: true, createdBy: true, products: true },
    });
    return response;
  }

  async findOne(id: string) {
    const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: { supplier: true, createdBy: true, products: true },
    });
    if (!purchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }
    return purchaseOrder;
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
      where: { id },
    });
    if (!purchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }
    return this.prisma.purchaseOrder.update({
      where: { id },
      data: {
        supplierId: updatePurchaseOrderDto.supplierId,
        orderDate: updatePurchaseOrderDto.orderDate,
        status: updatePurchaseOrderDto.status as any,
        totalAmount: updatePurchaseOrderDto.totalAmount,
      },
      include: { supplier: true, createdBy: true, products: true },
    });
  }

  async remove(id: string) {
    const purchaseOrder = await this.prisma.purchaseOrder.findUnique({
      where: { id },
    });
    if (!purchaseOrder) {
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    }
    return this.prisma.purchaseOrder.delete({ where: { id } });
  }
}

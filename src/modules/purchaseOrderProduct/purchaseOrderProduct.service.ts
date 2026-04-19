import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseOrderProductDto } from './dto/create.dto';
import { UpdatePurchaseOrderProductDto } from './dto/update.dto';

@Injectable()
export class PurchaseOrderProductService {
  constructor(private prisma: PrismaService) {}

  async create(createPurchaseOrderProductDto: CreatePurchaseOrderProductDto) {
    try {
      return await this.prisma.purchaseOrderProduct.create({
        data: {
          purchaseOrderId: createPurchaseOrderProductDto.purchaseOrderId,
          productId: createPurchaseOrderProductDto.productId,
          quantity: createPurchaseOrderProductDto.quantity,
          unitPrice: createPurchaseOrderProductDto.unitPrice,
        },
        include: { purchaseOrder: true, product: true }, // Include related purchase order and product
      });
    } catch (error) {
      console.error('Error creating purchase order product:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.purchaseOrderProduct.findMany({
      include: { purchaseOrder: true, product: true },
    });
    return response;
  }

  async findOne(id: string) {
    const purchaseOrderProduct =
      await this.prisma.purchaseOrderProduct.findUnique({
        where: { id },
        include: { purchaseOrder: true, product: true },
      });
    if (!purchaseOrderProduct) {
      throw new NotFoundException(
        `PurchaseOrderProduct with ID ${id} not found`,
      );
    }
    return purchaseOrderProduct;
  }

  async update(
    id: string,
    updatePurchaseOrderProductDto: UpdatePurchaseOrderProductDto,
  ) {
    const purchaseOrderProduct =
      await this.prisma.purchaseOrderProduct.findUnique({
        where: { id },
      });
    if (!purchaseOrderProduct) {
      throw new NotFoundException(
        `PurchaseOrderProduct with ID ${id} not found`,
      );
    }
    return this.prisma.purchaseOrderProduct.update({
      where: { id },
      data: {
        quantity: updatePurchaseOrderProductDto.quantity,
        unitPrice: updatePurchaseOrderProductDto.unitPrice,
      },
      include: { purchaseOrder: true, product: true },
    });
  }

  async remove(id: string) {
    const purchaseOrderProduct =
      await this.prisma.purchaseOrderProduct.findUnique({
        where: { id },
      });
    if (!purchaseOrderProduct) {
      throw new NotFoundException(
        `PurchaseOrderProduct with ID ${id} not found`,
      );
    }
    return this.prisma.purchaseOrderProduct.delete({ where: { id } });
  }
}

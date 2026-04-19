import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { stringify } from 'querystring';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          sku: createProductDto.sku,
          category: { connect: { id: createProductDto.categoryId } },
          subCategory: createProductDto.subCategoryId
            ? { connect: { id: createProductDto.subCategoryId } }
            : undefined,
          supplier: createProductDto.supplierId
            ? { connect: { id: createProductDto.supplierId } }
            : undefined, // Use `supplier` with `connect` for the relation
          images: createProductDto.images || [],
          createdBy: { connect: { id: createProductDto.createdById || '' } },
          createdAt: createProductDto.createdAt
            ? new Date(createProductDto.createdAt)
            : undefined,
          updatedAt: createProductDto.updatedAt
            ? new Date(createProductDto.updatedAt)
            : undefined,
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findAll() {
    const response = await this.prisma.product.findMany({
      include: {
        category: true,
        subCategory: true,
        createdBy: true,
        variants: true,
        stock: {
          include: {
            warehouse: true,
          },
        },
        prices: true,
        customFields: true,
        purchaseOrders: true,
        saleItems: true,
        productMaterials: {
          include: {
            rawMaterial: {
              include: {
                supplier: true,
              },
            },
          },
        },
      },
      /*  where: {
        isDeleted: false,
      }, */
    });
    return response;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true, subCategories: true },
    });
    if (!category) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Opcional: validar que no esté eliminado
    if (product.isDeleted) {
      throw new BadRequestException(
        'No se puede actualizar un producto eliminado',
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        // Si quieres manejar relaciones de forma segura:
        // category: updateProductDto.categoryId ? { connect: { id: updateProductDto.categoryId } } : undefined,
        // subCategory: updateProductDto.subCategoryId !== undefined ? { connect: updateProductDto.subCategoryId ? { id: updateProductDto.subCategoryId } : { disconnect: true } } : undefined,
        // etc.
      },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        saleItems: { take: 1 },
        purchaseOrders: { take: 1 },
      },
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    // Si tiene movimientos, NO lo borramos de la DB
    if (product.saleItems.length > 0 || product.purchaseOrders.length > 0) {
      return this.prisma.product.update({
        where: { id },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      });
    }

    // Si está "limpio", borrado físico completo
    return this.prisma.product.delete({ where: { id } });
  }
  // Pausar producto
  async pause(id: string, reason?: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, status: true, isDeleted: true },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (product.isDeleted) {
      throw new BadRequestException('No se puede pausar un producto eliminado');
    }

    if (product.status === 'PAUSED') {
      throw new BadRequestException('El producto ya está pausado');
    }

    if (product.status === 'DISCONTINUED') {
      throw new BadRequestException(
        'No se puede pausar un producto descontinuado',
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        status: 'PAUSED',
        statusChangedAt: new Date(),
        statusReason: reason || null,
      },
    });
  }

  // Reactivar / Activar
  async activate(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, status: true, isDeleted: true },
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (product.isDeleted) {
      throw new BadRequestException(
        'No se puede activar un producto eliminado',
      );
    }

    if (product.status === 'ACTIVE') {
      throw new BadRequestException('El producto ya está activo');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        status: 'ACTIVE',
        statusChangedAt: new Date(),
        statusReason: null, // o podrías mantenerlo si quieres historial
      },
    });
  }

  // Descontinuar (más permanente que pausar)
  async discontinue(id: string, reason?: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true, status: true, isDeleted: true },
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    if (product.isDeleted) {
      throw new BadRequestException(
        'No se puede descontinuar un producto eliminado',
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        status: 'DISCONTINUED',
        statusChangedAt: new Date(),
        statusReason: reason || 'Descontinuado por decisión administrativa',
      },
    });
  }

  // Toggle entre ACTIVE y PAUSED (útil para botones rápidos)
  async togglePause(id: string, reasonForPause?: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!product) throw new NotFoundException('Producto no encontrado');

    if (product.status === 'ACTIVE') {
      return this.pause(id, reasonForPause);
    } else if (product.status === 'PAUSED') {
      return this.activate(id);
    } else {
      throw new BadRequestException(
        `No se puede alternar el estado desde ${product.status}`,
      );
    }
  }
}

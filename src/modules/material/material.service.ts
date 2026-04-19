import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { stringify } from 'querystring';
import { CreateMaterialDto } from './dto/create-productMaterial.dto';
import { UpdateMaterialDto } from './dto/update-productMaterial.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class MaterialService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createMaterialDto: CreateMaterialDto) {
    try {
      return await this.prisma.productMaterial.create({
        data: {
          ...createMaterialDto,
        },
        include: {
          product: true, // Incluye la relación con el producto si es necesario
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error; // Propaga el error para que el cliente reciba la respuesta adecuada
    }
  }

  async findAll() {
    const response = this.prisma.productMaterial.findMany({
      include: {
        product: true,
        // Remove or replace 'createdBy' with the correct relation name if it exists in your schema
        // For example, if the relation is 'user', use:
        // user: {
        //   select: {
        //     id: true,
        //     name: true,
        //     email: true,
        //   },
        // },
      },
    });
    return response;
  }

  async findOne(id: string) {
    const productMaterial = await this.prisma.productMaterial.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });
    if (!productMaterial) {
      throw new NotFoundException(`Product Material with ID ${id} not found`);
    }
    return productMaterial;
  }

  async update(id: string, updateCategoryDto: UpdateMaterialDto) {
    const productMaterial = await this.prisma.productMaterial.findUnique({
      where: { id },
    });
    if (!productMaterial) {
      throw new NotFoundException(`Product Material with ID ${id} not found`);
    }
    return this.prisma.productMaterial.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    const productMaterial = await this.prisma.productMaterial.findUnique({
      where: { id },
    });
    if (!productMaterial) {
      throw new NotFoundException(`Product Material with ID ${id} not found`);
    }
    return this.prisma.productMaterial.delete({ where: { id } });
  }
}

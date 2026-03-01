import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRawMaterialDto } from './dto/create-rawmaterial.dto';
import { UpdateRawMaterialDto } from './dto/update-rawmaterial.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RawMaterialService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(createRawMaterialDto: CreateRawMaterialDto) {
    try {
      console.log(
        'etoy hacienod el crate roa material dto',
        createRawMaterialDto,
      );

      return await this.prisma.rawMaterial.create({
        data: {
          ...createRawMaterialDto,
          unitPrice: createRawMaterialDto.unitPrice,
          unitOfMeasure: createRawMaterialDto.unitOfMeasure,
          stockQuantity: createRawMaterialDto.stockQuantity,
        },
      });
    } catch (error) {
      console.error('Error creating raw material:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.rawMaterial.findMany();

    return response;
  }

  async findOne(id: string) {
    const rawMaterial = await this.prisma.rawMaterial.findUnique({
      where: { id },
    });

    if (!rawMaterial) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
    return rawMaterial;
  }

  async update(id: string, updateRawMaterialDto: UpdateRawMaterialDto) {
    const rawMaterial = await this.prisma.rawMaterial.findUnique({
      where: { id },
    });
    if (!rawMaterial) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
    return this.prisma.rawMaterial.update({
      where: { id },
      data: updateRawMaterialDto,
    });
  }

  async remove(id: string) {
    const rawMaterial = await this.prisma.rawMaterial.findUnique({
      where: { id },
    });
    if (!rawMaterial) {
      throw new NotFoundException(`RawMaterial with ID ${id} not found`);
    }
    return this.prisma.rawMaterial.delete({ where: { id } });
  }
}

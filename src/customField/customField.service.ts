import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomFieldDto } from './dto/create.dto';
import { UpdateCustomFieldDto } from './dto/update.dto';

@Injectable()
export class CustomFieldService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomFieldDto: CreateCustomFieldDto) {
    try {
      return await this.prisma.customField.create({
        data: {
          productId: createCustomFieldDto.productId,
          name: createCustomFieldDto.name,
          value: createCustomFieldDto.value,
          type: createCustomFieldDto.type as any,
        },
        include: { product: true }, // Include related product
      });
    } catch (error) {
      console.error('Error creating custom field:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.customField.findMany({
      include: { product: true },
    });
    return response;
  }

  async findOne(id: string) {
    const customField = await this.prisma.customField.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!customField) {
      throw new NotFoundException(`CustomField with ID ${id} not found`);
    }
    return customField;
  }

  async update(id: string, updateCustomFieldDto: UpdateCustomFieldDto) {
    const customField = await this.prisma.customField.findUnique({
      where: { id },
    });
    if (!customField) {
      throw new NotFoundException(`CustomField with ID ${id} not found`);
    }
    return this.prisma.customField.update({
      where: { id },
      data: {
        name: updateCustomFieldDto.name,
        value: updateCustomFieldDto.value,
        type: updateCustomFieldDto.type as any,
      },
      include: { product: true },
    });
  }

  async remove(id: string) {
    const customField = await this.prisma.customField.findUnique({
      where: { id },
    });
    if (!customField) {
      throw new NotFoundException(`CustomField with ID ${id} not found`);
    }
    return this.prisma.customField.delete({ where: { id } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    return this.prisma.subCategory.create({
      data: {
        name: createSubCategoryDto.name,
        categoryId: createSubCategoryDto.categoryId,
      },
    });
  }

  async findAll() {
    const response = await this.prisma.subCategory.findMany({
      include: { category: true, products: true },
    });
    console.log('response ', JSON.stringify(response));
    return response;
  }

  async findOne(id: string) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
      include: { category: true, products: true },
    });
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return subCategory;
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return this.prisma.subCategory.update({
      where: { id },
      data: updateSubCategoryDto,
    });
  }

  async remove(id: string) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });
    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }
    return this.prisma.subCategory.delete({ where: { id } });
  }
}

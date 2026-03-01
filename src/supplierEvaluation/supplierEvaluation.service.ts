import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierEvaluationDto } from './dto/create.dto';
import { UpdateSupplierEvaluationDto } from './dto/update.dto';

@Injectable()
export class SupplierEvaluationService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierEvaluationDto: CreateSupplierEvaluationDto) {
    try {
      return await this.prisma.supplierEvaluation.create({
        data: {
          supplierId: createSupplierEvaluationDto.supplierId,
          deliveryTime: createSupplierEvaluationDto.deliveryTime,
          qualityRating: createSupplierEvaluationDto.qualityRating,
          priceCompetitiveness:
            createSupplierEvaluationDto.priceCompetitiveness,
          comments: createSupplierEvaluationDto.comments,
        },
        include: { supplier: true }, // Include related supplier
      });
    } catch (error) {
      console.error('Error creating supplier evaluation:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.supplierEvaluation.findMany({
      include: { supplier: true },
    });
    return response;
  }

  async findOne(id: string) {
    const supplierEvaluation = await this.prisma.supplierEvaluation.findUnique({
      where: { id },
      include: { supplier: true },
    });
    if (!supplierEvaluation) {
      throw new NotFoundException(`SupplierEvaluation with ID ${id} not found`);
    }
    return supplierEvaluation;
  }

  async update(
    id: string,
    updateSupplierEvaluationDto: UpdateSupplierEvaluationDto,
  ) {
    const supplierEvaluation = await this.prisma.supplierEvaluation.findUnique({
      where: { id },
    });
    if (!supplierEvaluation) {
      throw new NotFoundException(`SupplierEvaluation with ID ${id} not found`);
    }
    return this.prisma.supplierEvaluation.update({
      where: { id },
      data: {
        deliveryTime: updateSupplierEvaluationDto.deliveryTime,
        qualityRating: updateSupplierEvaluationDto.qualityRating,
        priceCompetitiveness: updateSupplierEvaluationDto.priceCompetitiveness,
        comments: updateSupplierEvaluationDto.comments,
      },
      include: { supplier: true },
    });
  }

  async remove(id: string) {
    const supplierEvaluation = await this.prisma.supplierEvaluation.findUnique({
      where: { id },
    });
    if (!supplierEvaluation) {
      throw new NotFoundException(`SupplierEvaluation with ID ${id} not found`);
    }
    return this.prisma.supplierEvaluation.delete({ where: { id } });
  }
}

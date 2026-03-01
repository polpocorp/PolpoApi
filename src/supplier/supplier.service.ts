import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto'; // Updated to CreateSupplierDto
import { UpdateSupplierDto } from './dto/update-supplier.dto'; // Updated to UpdateSupplierDto
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SupplierService {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService, // Retained, though unused
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      return await this.prisma.supplier.create({
        data: {
          name: createSupplierDto.name,
          phone: createSupplierDto.phone,
          email: createSupplierDto.email,
          address: createSupplierDto.address,
          state: createSupplierDto.state,
          city: createSupplierDto.city,
          numberStreet: createSupplierDto.numberStreet,
        },
      });
    } catch (error) {
      console.error('Error creating supplier:', error);
      throw error; // Propagate the error for proper client response
    }
  }

  async findAll() {
    const response = await this.prisma.supplier.findMany(); // Updated to supplier
    return response;
  }

  async findOne(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  async remove(id: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return this.prisma.supplier.delete({ where: { id } });
  }
}

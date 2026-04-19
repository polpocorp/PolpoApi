import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDynamicObjectDto } from './dto/create-dynamic-object.dto';
import { UpdateDynamicObjectDto } from './dto/update-dynamic-object.dto';
import { Prisma, DynamicObject } from '@prisma/client';

@Injectable()
export class DynamicObjectsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createDto: CreateDynamicObjectDto,
    createdById: string,
  ): Promise<DynamicObject> {
    // Validación extra del slug (único)
    const existing = await this.prisma.dynamicObject.findUnique({
      where: { slug: createDto.slug },
    });

    if (existing) {
      throw new BadRequestException('El slug ya está en uso');
    }
    console.log({ createDto });
    return this.prisma.dynamicObject.create({
      data: {
        name: createDto.name,
        slug: createDto.slug,
        description: createDto.description,
        fields: createDto.fields as unknown as Prisma.JsonArray,
        color: createDto.color,
        createdBy: {
          connect: { id: createdById },
        },
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findAll() {
    const response = await this.prisma.dynamicObject.findMany({
      where: {
        // isDeleted: false,   // descomentar si implementas soft-delete
      },
      include: {
        createdBy: { select: { id: true, name: true } },
        _count: { select: { records: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log({ response });
    return this.prisma.dynamicObject.findMany({
      where: {
        // isDeleted: false,   // descomentar si implementas soft-delete
      },
      include: {
        createdBy: { select: { id: true, name: true } },
        _count: { select: { records: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(
    id: string,
  ): Promise<DynamicObject & { createdBy?: any; records?: any }> {
    const obj = await this.prisma.dynamicObject.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        records: { take: 1 }, // solo para debug → quitar en producción
      },
    });

    if (!obj) {
      throw new NotFoundException(`DynamicObject con id ${id} no encontrado`);
    }

    return obj;
  }

  async update(
    id: string,
    updateDto: UpdateDynamicObjectDto,
    userId: string,
  ): Promise<DynamicObject> {
    // Validamos que existe (y opcionalmente permisos)
    await this.findOne(id);

    // Aquí podrías agregar lógica de autorización
    // if (existing.createdById !== userId && !isAdmin) ...

    return this.prisma.dynamicObject.update({
      where: { id },
      data: {
        name: updateDto.name,
        ...(updateDto.fields !== undefined && {
          fields: updateDto.fields as unknown as Prisma.JsonArray,
        }),
        color: updateDto.color,
      },
      include: {
        createdBy: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async remove(id: string): Promise<DynamicObject> {
    await this.findOne(id); // valida existencia

    // Borrado físico (hard delete)
    return this.prisma.dynamicObject.delete({
      where: { id },
    });

    // Si querés soft-delete en el futuro:
    // return this.prisma.dynamicObject.update({
    //   where: { id },
    //   data: { isDeleted: true, deletedAt: new Date() },
    // });
  }

  // Bonus: obtener solo los campos (útil para formularios dinámicos)
  async getFields(id: string): Promise<Prisma.JsonArray> {
    const obj = await this.prisma.dynamicObject.findUnique({
      where: { id },
      select: { fields: true },
    });

    if (!obj) {
      throw new NotFoundException(`DynamicObject con id ${id} no encontrado`);
    }

    // Casteamos porque sabemos que es un array (por el schema y cómo lo creamos)
    return obj.fields as Prisma.JsonArray;
  }
}

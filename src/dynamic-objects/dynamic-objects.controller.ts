import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DynamicObjectsService } from './dynamic-objects.service';
import { CreateDynamicObjectDto } from './dto/create-dynamic-object.dto';
import { UpdateDynamicObjectDto } from './dto/update-dynamic-object.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // asumo que tienes autenticación JWT

@Controller('dynamic-objects')
@UseGuards(JwtAuthGuard)
export class DynamicObjectsController {
  constructor(private readonly dynamicObjectsService: DynamicObjectsService) {}

  @Post()
  create(@Body() createDto: CreateDynamicObjectDto, @Request() req) {
    return this.dynamicObjectsService.create(createDto, req.user.sub); // sub = user id
  }

  @Get()
  findAll() {
    return this.dynamicObjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicObjectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDynamicObjectDto,
    @Request() req,
  ) {
    return this.dynamicObjectsService.update(id, updateDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicObjectsService.remove(id);
  }

  // Endpoint útil para frontend dinámico
  @Get(':id/fields')
  getFields(@Param('id') id: string) {
    return this.dynamicObjectsService.getFields(id);
  }
}

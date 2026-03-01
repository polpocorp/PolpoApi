import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVariantDto } from './dto/create.dto';
import { UpdateVariantDto } from './dto/update.dto';
import { VariantService } from './variant.service';

@Controller('variants')
@UseGuards(JwtAuthGuard)
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    console.log('Creating variant with data:', createVariantDto);
    return this.variantService.create(createVariantDto);
  }

  @Get()
  findAll() {
    return this.variantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantService.update(id, updateVariantDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.variantService.remove(id);
  }
}

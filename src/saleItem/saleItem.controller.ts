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
import { CreateSaleItemDto } from './dto/create.dto';
import { UpdateSaleItemDto } from './dto/update.dto';
import { SaleItemService } from './saleItem.service';

@Controller('sale-items')
@UseGuards(JwtAuthGuard)
export class SaleItemController {
  constructor(private readonly saleItemService: SaleItemService) {}

  @Post()
  create(@Body() createSaleItemDto: CreateSaleItemDto) {
    console.log('Creating sale item with data:', createSaleItemDto);
    return this.saleItemService.create(createSaleItemDto);
  }

  @Get()
  findAll() {
    return this.saleItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleItemService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateSaleItemDto: UpdateSaleItemDto,
  ) {
    return this.saleItemService.update(id, updateSaleItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.saleItemService.remove(id);
  }
}

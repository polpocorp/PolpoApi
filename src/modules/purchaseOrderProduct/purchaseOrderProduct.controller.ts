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
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreatePurchaseOrderProductDto } from './dto/create.dto';
import { UpdatePurchaseOrderProductDto } from './dto/update.dto';
import { PurchaseOrderProductService } from './purchaseOrderProduct.service';

@Controller('purchase-order-products')
@UseGuards(JwtAuthGuard)
export class PurchaseOrderProductController {
  constructor(
    private readonly purchaseOrderProductService: PurchaseOrderProductService,
  ) {}

  @Post()
  create(@Body() createPurchaseOrderProductDto: CreatePurchaseOrderProductDto) {
    console.log(
      'Creating purchase order product with data:',
      createPurchaseOrderProductDto,
    );
    return this.purchaseOrderProductService.create(
      createPurchaseOrderProductDto,
    );
  }

  @Get()
  findAll() {
    return this.purchaseOrderProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderProductService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderProductDto: UpdatePurchaseOrderProductDto,
  ) {
    return this.purchaseOrderProductService.update(
      id,
      updatePurchaseOrderProductDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.purchaseOrderProductService.remove(id);
  }
}

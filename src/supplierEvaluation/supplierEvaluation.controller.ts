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
import { CreateSupplierEvaluationDto } from './dto/create.dto';
import { UpdateSupplierEvaluationDto } from './dto/update.dto';
import { SupplierEvaluationService } from './supplierEvaluation.service';

@Controller('supplier-evaluations')
@UseGuards(JwtAuthGuard)
export class SupplierEvaluationController {
  constructor(
    private readonly supplierEvaluationService: SupplierEvaluationService,
  ) {}

  @Post()
  create(@Body() createSupplierEvaluationDto: CreateSupplierEvaluationDto) {
    console.log(
      'Creating supplier evaluation with data:',
      createSupplierEvaluationDto,
    );
    return this.supplierEvaluationService.create(createSupplierEvaluationDto);
  }

  @Get()
  findAll() {
    return this.supplierEvaluationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierEvaluationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateSupplierEvaluationDto: UpdateSupplierEvaluationDto,
  ) {
    return this.supplierEvaluationService.update(
      id,
      updateSupplierEvaluationDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.supplierEvaluationService.remove(id);
  }
}

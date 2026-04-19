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
import { CreateCustomFieldDto } from './dto/create.dto';
import { UpdateCustomFieldDto } from './dto/update.dto';
import { CustomFieldService } from './customField.service';

@Controller('custom-fields')
@UseGuards(JwtAuthGuard)
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @Post()
  create(@Body() createCustomFieldDto: CreateCustomFieldDto) {
    console.log('Creating custom field with data:', createCustomFieldDto);
    return this.customFieldService.create(createCustomFieldDto);
  }

  @Get()
  findAll() {
    return this.customFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customFieldService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateCustomFieldDto: UpdateCustomFieldDto,
  ) {
    return this.customFieldService.update(id, updateCustomFieldDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.customFieldService.remove(id);
  }
}

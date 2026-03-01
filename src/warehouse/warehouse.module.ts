import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { WarehouseController } from './warehouse.controller';
import { warehouseService } from './warehouse.service';

@Module({
  imports: [AuthModule],
  controllers: [WarehouseController],
  providers: [warehouseService, PrismaService],
})
export class WarehouseModule {}

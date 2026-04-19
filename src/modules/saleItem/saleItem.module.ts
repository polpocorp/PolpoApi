import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { SaleItemController } from './saleItem.controller';
import { SaleItemService } from './saleItem.service';

@Module({
  imports: [AuthModule],
  controllers: [SaleItemController],
  providers: [SaleItemService, PrismaService],
})
export class SaleItemModule {}

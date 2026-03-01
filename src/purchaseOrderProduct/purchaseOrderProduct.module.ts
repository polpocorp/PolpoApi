import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PurchaseOrderProductController } from './purchaseOrderProduct.controller';
import { PurchaseOrderProductService } from './purchaseOrderProduct.service';

@Module({
  imports: [AuthModule],
  controllers: [PurchaseOrderProductController],
  providers: [PurchaseOrderProductService, PrismaService],
})
export class PurchaseOrderProductModule {}

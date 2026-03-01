import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PurchaseOrderController } from './purchaseOrder.controller';
import { PurchaseOrderService } from './purchaseOrder.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService, PrismaService],
})
export class PurchaseOrderModule {}

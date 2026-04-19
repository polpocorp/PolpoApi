import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { StockMovementController } from './stockMovement.controller';
import { StockMovementService } from './stockMovement.service';

@Module({
  imports: [AuthModule],
  controllers: [StockMovementController],
  providers: [StockMovementService, PrismaService],
})
export class StockMovementModule {}

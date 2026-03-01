import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { SupplierEvaluationController } from './supplierEvaluation.controller';
import { SupplierEvaluationService } from './supplierEvaluation.service';

@Module({
  imports: [AuthModule],
  controllers: [SupplierEvaluationController],
  providers: [SupplierEvaluationService, PrismaService],
})
export class SupplierEvaluationModule {}

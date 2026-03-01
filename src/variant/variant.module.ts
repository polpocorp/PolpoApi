import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';

@Module({
  imports: [AuthModule],
  controllers: [VariantController],
  providers: [VariantService, PrismaService],
})
export class VariantModule {}

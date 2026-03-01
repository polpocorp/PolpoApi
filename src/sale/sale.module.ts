import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [SaleController],
  providers: [SaleService, PrismaService],
})
export class SaleModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

@Module({
  imports: [AuthModule],
  controllers: [PriceController],
  providers: [PriceService, PrismaService],
})
export class PriceModule {}

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { CustomFieldController } from './customField.controller';
import { CustomFieldService } from './customField.service';

@Module({
  imports: [AuthModule],
  controllers: [CustomFieldController],
  providers: [CustomFieldService, PrismaService],
})
export class CustomFieldModule {}

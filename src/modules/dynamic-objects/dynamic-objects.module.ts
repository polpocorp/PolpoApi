import { Module } from '@nestjs/common';
import { DynamicObjectsService } from './dynamic-objects.service';
import { DynamicObjectsController } from './dynamic-objects.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DynamicObjectsController],
  providers: [DynamicObjectsService, PrismaService],
  exports: [DynamicObjectsService], // si otros módulos lo necesitan
})
export class DynamicObjectsModule {}

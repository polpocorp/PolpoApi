import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService],
})
export class ProductMaterialModule {}

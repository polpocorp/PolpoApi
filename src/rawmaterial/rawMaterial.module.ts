import { Module } from '@nestjs/common';
import { RawMaterialService } from './rawMaterial.service';
import { RawMaterialController } from './rawMaterial.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [RawMaterialController],
  providers: [RawMaterialService, PrismaService],
})
export class RawMaterialModule {}

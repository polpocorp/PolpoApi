import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/modules/email/email.module';
import { SecurityUtil } from 'src/utils/security/security.util';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [UsersService, PrismaService, SecurityUtil],
  exports: [UsersService],
})
export class UsersModule {}

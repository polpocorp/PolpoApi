// src/ai/ai.module.ts
import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Importamos ConfigModule para leer la API KEY
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService], // Por si quieres usar la IA dentro de otros servicios
})
export class AiModule {}

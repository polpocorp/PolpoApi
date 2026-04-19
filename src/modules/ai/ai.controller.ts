// src/ai/ai.controller.ts
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { ProcessAiDto } from './dto/process-ai.dto';

@Controller('ai')
export class AiController {
  private readonly logger = new Logger(AiController.name);

  constructor(private readonly aiService: AiService) {}

  @Post('process')
  async processUserCommand(@Body() data: ProcessAiDto) {
    this.logger.log(`Recibiendo datos de n8n: ${JSON.stringify(data)}`);

    if (!data.prompt) {
      throw new BadRequestException(
        'El campo "prompt" es obligatorio para procesar la IA',
      );
    }

    // Pasamos el prompt al servicio para que decida si es una factura o una orden
    return await this.aiService.executeCommand(data.prompt);
  }
}

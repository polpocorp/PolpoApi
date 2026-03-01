import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('process')
  async processUserCommand(@Body('prompt') prompt: string) {
    // <-- Verifica que 'prompt' no sea undefined
    console.log('Prompt recibido:', prompt);
    if (!prompt) throw new BadRequestException('El prompt está vacío');

    return await this.aiService.executeCommand(prompt);
  }
}

// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async executeCommand(prompt: string) {
    // Lógica para detectar si el prompt parece un JSON de factura (OCR) o texto natural
    try {
      if (prompt.includes('{')) {
        const structuredData = JSON.parse(prompt);
        return this.handleStructuredInvoice(structuredData);
      }
    } catch (e) {
      // Si falla el parseo, lo tratamos como lenguaje natural (NLP)
    }

    return this.handleNaturalLanguage(prompt);
  }

  private async handleStructuredInvoice(data: any) {
    // Aquí conectas con tu servicio de Prisma para guardar la compra
    return {
      action: 'INVOICE_PROCESSED',
      message: `Factura de ${data.proveedor || 'desconocido'} por ${data.monto || 0} registrada.`,
      data,
    };
  }

  private async handleNaturalLanguage(text: string) {
    // Aquí procesas comandos como "Vendí 2 cafés"
    return {
      action: 'COMMAND_EXECUTED',
      message: `Comando procesado: ${text}`,
    };
  }
}

// ai.service.ts en NestJS
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

@Injectable()
export class AiService implements OnModuleInit {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async onModuleInit() {
    console.log(
      '🚀 AI Service activo. Esperando liberación de cuota de Google...',
    );
  }

  async executeCommand(prompt: string) {
    try {
      // Usamos el modelo 2.0-flash que ya validamos en tu lista
      console.log({ prompt });
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash', // Or 'gemini-2.5-pro', etc.
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
      });
      console.log({ model });

      const systemInstruction = `Eres el asistente de "Polpo". 
      Responde ÚNICAMENTE en formato JSON. 
      Acciones: "CREATE_PRODUCT", "UPDATE_STOCK", "UNKNOWN".
      Ejemplo: {"action": "UNKNOWN", "payload": {}, "message": "Hola, ¿en qué ayudo?"}`;

      const result = await model.generateContent(
        `${systemInstruction}\n\nUser: ${prompt}`,
      );

      console.log({ result });
      const text = result.response.text();

      // Limpieza de Markdown por si Gemini envía ```json
      const cleanJson = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (error: any) {
      console.error('--- ESTADO DE LA API ---');
      console.error(error); // Add this to log the full error object
      console.error(error.message); // Or just the message if preferred

      if (error.message.includes('429')) {
        console.log(
          '⏳ Google está procesando la vinculación de tu tarjeta...',
        );
        return {
          action: 'UNKNOWN',
          payload: {},
          message:
            'Estoy terminando de configurar mi conexión. ¡Intenta de nuevo en un minuto!',
        };
      }

      return {
        action: 'UNKNOWN',
        payload: { error: error.message },
        message: 'Hubo un pequeño error técnico. ¿Podrías repetir eso?',
      };
    }
  }
}

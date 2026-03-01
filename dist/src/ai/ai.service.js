"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
let AiService = class AiService {
    genAI;
    constructor() {
        this.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    }
    async onModuleInit() {
        console.log('🚀 AI Service activo. Esperando liberación de cuota de Google...');
    }
    async executeCommand(prompt) {
        try {
            console.log({ prompt });
            const model = this.genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                safetySettings: [
                    {
                        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                    },
                    {
                        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                    },
                ],
            });
            console.log({ model });
            const systemInstruction = `Eres el asistente de "Entrepreneur Manager". 
      Responde ÚNICAMENTE en formato JSON. 
      Acciones: "CREATE_PRODUCT", "UPDATE_STOCK", "UNKNOWN".
      Ejemplo: {"action": "UNKNOWN", "payload": {}, "message": "Hola, ¿en qué ayudo?"}`;
            const result = await model.generateContent(`${systemInstruction}\n\nUser: ${prompt}`);
            console.log({ result });
            const text = result.response.text();
            const cleanJson = text.replace(/```json|```/g, '').trim();
            return JSON.parse(cleanJson);
        }
        catch (error) {
            console.error('--- ESTADO DE LA API ---');
            console.error(error);
            console.error(error.message);
            if (error.message.includes('429')) {
                console.log('⏳ Google está procesando la vinculación de tu tarjeta...');
                return {
                    action: 'UNKNOWN',
                    payload: {},
                    message: 'Estoy terminando de configurar mi conexión. ¡Intenta de nuevo en un minuto!',
                };
            }
            return {
                action: 'UNKNOWN',
                payload: { error: error.message },
                message: 'Hubo un pequeño error técnico. ¿Podrías repetir eso?',
            };
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AiService);
//# sourceMappingURL=ai.service.js.map
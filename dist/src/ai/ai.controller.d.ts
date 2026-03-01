import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    processUserCommand(prompt: string): Promise<any>;
}

import { OnModuleInit } from '@nestjs/common';
export declare class AiService implements OnModuleInit {
    private genAI;
    constructor();
    onModuleInit(): Promise<void>;
    executeCommand(prompt: string): Promise<any>;
}

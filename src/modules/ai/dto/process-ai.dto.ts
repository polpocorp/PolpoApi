import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class ProcessAiDto {
  @IsString()
  @IsNotEmpty()
  prompt!: string;

  @IsOptional()
  @IsIn(['whatsapp', 'telegram'])
  source?: 'whatsapp' | 'telegram';

  @IsOptional()
  context?: any;
}

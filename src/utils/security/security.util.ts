import * as dns from 'node:dns/promises';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SecurityUtil {
  generateRandomToken(length = 8): string {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');
  }

  async validateEmailDomain(email: string): Promise<void> {
    const hostname = email.split('@')[1];
    if (!hostname) throw new BadRequestException('Email inválido');

    try {
      const mx = await dns.resolveMx(hostname);
      if (!mx || mx.length === 0) throw new Error();
    } catch {
      throw new BadRequestException(
        'El dominio del email no es válido o no tiene registros MX',
      );
    }
  }
}

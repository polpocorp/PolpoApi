import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Verificar si la ruta es pública
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      console.log('Ruta pública, acceso permitido sin autenticación');
      return true;
    }

    // Extraer el token
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('No se proporcionó token');
    }

    // Verificar JWT_SECRET
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      console.error('JWT_SECRET no está definido');
      throw new UnauthorizedException(
        'Configuración del servidor incompleta: JWT_SECRET no definido',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request.user = payload;
      return true;
    } catch (error) {
      console.error('Error al validar el token:', error.message);
      throw new UnauthorizedException(
        `Token inválido o expirado: ${error.message}`,
      );
    }
  }
}

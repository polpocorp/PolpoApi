import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { getWelcomeTemplate } from 'src/templates/mail/welcome.template';
import { SecurityUtil } from 'src/utils/security/security.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: EmailService,
    private readonly securityUtil: SecurityUtil,
  ) {}

  async create(registerDto: RegisterDto) {
    const { email, password, name, role } = registerDto;
    console.log(`--- [DEBUG CREATE] Iniciando registro para: ${email} ---`);

    try {
      // Checkpoint 1: DNS
      await this.securityUtil.validateEmailDomain(email);
      console.log('--- [DEBUG CREATE] Checkpoint 1: Dominio DNS válido ---');

      // Checkpoint 2: Existencia
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        console.warn('--- [DEBUG CREATE] Email ya existe en DB ---');
        throw new ConflictException('Email already exists');
      }

      // Checkpoint 3: Transacción
      console.log('--- [DEBUG CREATE] Iniciando transacción Prisma... ---');
      const { user, tokenRecord } = await this.prisma.$transaction(
        async (tx) => {
          const newUser = await tx.user.create({
            data: {
              email,
              password: await bcrypt.hash(password, 10),
              name,
              role: role || 'USER',
            },
          });

          const newToken = await tx.token.create({
            data: {
              token: this.securityUtil.generateRandomToken(),
              userId: newUser.id,
              expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            },
          });

          return { user: newUser, tokenRecord: newToken };
        },
      );
      console.log('--- [DEBUG CREATE] Transacción completada con éxito ---');

      // ✅ Se usa tokenRecord.token (el que está guardado en DB)
      // ❌ Antes se generaba un token nuevo aquí que NO estaba en DB
      const html = getWelcomeTemplate({
        name: name,
        token: tokenRecord.token,
        url: `http://localhost:5173/auth/confirm?token=${tokenRecord.token}`,
      });

      // Checkpoint 4: Envío de Mail
      console.log('--- [DEBUG CREATE] Intentando enviar correo... ---');
      await this.mailService.send(email, '¡Bienvenido a Polpo!', html);
      console.log('--- [DEBUG CREATE] Proceso de email finalizado ---');

      return { user, token: tokenRecord.token };
    } catch (error) {
      console.error('--- [DEBUG CREATE ERROR] Falló el proceso ---');
      console.error('Tipo de Error:', error.constructor.name);
      console.error('Mensaje:', error.message);

      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(
        error.message || 'Error en el registro',
      );
    }
  }

  async createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: 'USER',
    };
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await this.prisma.token.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });
    return token;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateToken(token: string) {
    console.log('validate token', token);
    if (!token) {
      console.error('Token is undefined or empty');
      throw new NotFoundException('Token is required');
    }

    try {
      console.log('Validating token:', token);
      const tokenRecord = await this.prisma.token.findUnique({
        where: { token },
        include: { user: true },
      });
      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new NotFoundException('Invalid or expired token');
      }

      // Mark user as verified
      await this.prisma.user.update({
        where: { id: tokenRecord.userId },
        data: { isVerified: true },
      });

      // Descomentar para eliminar el token después de validarlo (recomendado)
      // await this.prisma.token.delete({ where: { token } });

      return tokenRecord.user;
    } catch (error) {
      console.error('Error validating token:', error);
      throw new NotFoundException('Invalid or expired token');
    }
  }
}

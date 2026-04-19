import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.initTransporter();
  }

  private initTransporter() {
    const user = this.configService.get('MAILUSERNAME');
    const clientId = this.configService.get('CLIENT_ID');
    const clientSecret = this.configService.get('CLIENT_SECRET');
    const refreshToken = this.configService.get('REFRESH_TOKEN');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('MAILUSERNAME'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        refreshToken: this.configService.get('REFRESH_TOKEN'),
      },
    });
  }

  async send(to: string, subject: string, content: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `Soporte Polpo <${this.configService.get('MAILUSERNAME')}>`,
        to,
        subject,
        html: content, // Aquí recibimos el HTML ya renderizado
      });
      this.logger.log(`📧 Email enviado exitosamente a ${to}`);
    } catch (error) {
      this.logger.error(`❌ Error al enviar mail: ${error.message}`);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }
}

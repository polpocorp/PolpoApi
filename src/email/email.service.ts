import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    try {
      this.logger.log(
        `Sending verification email to ${to} with token ${token}`,
      );
      const mailOptions = {
        from: `"Polpo" <${process.env.SMTP_FROM_EMAIL || 'no-reply@manageur.com'}>`,
        to,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${token}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Welcome to Polpo!</h2>
            <p>Please use the following code to verify your email address:</p>
            <h3 style="color: #007bff;">${token}</h3>
            <p>This code is valid for 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${to}: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to send verification email: ${error.message}`);
    }
  }
}

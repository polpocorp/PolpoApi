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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let EmailService = EmailService_1 = class EmailService {
    transporter;
    logger = new common_1.Logger(EmailService_1.name);
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendVerificationEmail(to, token) {
        try {
            this.logger.log(`Sending verification email to ${to} with token ${token}`);
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
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${to}: ${error.message}`, error.stack);
            throw new Error(`Failed to send verification email: ${error.message}`);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map
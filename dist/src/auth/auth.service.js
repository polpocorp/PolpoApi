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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../email/email.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    usersService;
    emailService;
    prisma;
    jwtService;
    constructor(usersService, emailService, prisma, jwtService) {
        this.usersService = usersService;
        this.emailService = emailService;
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { user, token } = await this.usersService.create(registerDto);
        return { message: 'User registered. Please verify your email.' };
    }
    async confirmToken(token) {
        const user = await this.usersService.validateToken(token);
        const authToken = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { secret: process.env.JWT_SECRET, expiresIn: '7d', algorithm: 'HS256' });
        if (!user) {
            throw new common_1.NotFoundException('Invalid or expired token');
        }
        return { user, authToken };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const userPrisma = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        console.log(`User found in Prisma:`, userPrisma);
        const user = await this.usersService.findByEmail(email);
        console.log(`User found in UsersService:`, user);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('Email not verified');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const response = await this.usersService.createToken(user);
        if (!response || !response) {
            throw new common_1.UnauthorizedException('Failed to generate access token');
        }
        console.log(`Generated access token for user ${user.email}:`, response);
        return {
            user: { id: user.id, email: user.email, role: user.role },
            accessToken: response,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        email_service_1.EmailService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
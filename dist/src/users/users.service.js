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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const jwt = require("jsonwebtoken");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(registerDto) {
        const { email, password, name, role } = registerDto;
        console.log(email, password, role);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed password:`, hashedPassword);
        const userPrisma = await this.prisma.user.findUnique({
            where: { email },
        });
        if (userPrisma) {
            throw new common_1.ConflictException('Email already exists');
        }
        console.log(`Creating user with email:`, email);
        if (!email || !password) {
            throw new common_1.ConflictException('Email and password are required');
        }
        if (password.length < 6) {
            throw new common_1.ConflictException('Password must be at least 6 characters long');
        }
        if (!name) {
            throw new common_1.ConflictException('Name is required');
        }
        console.log(`Creating user with email: ${email}`);
        console.log(`Hashed password: ${hashedPassword}`);
        console.log(`Role: ${role || 'USER'}`);
        console.log(`Name: ${name}`);
        console.log(`Creating user in Prisma...`);
        console.log(`User data:`, {
            email,
            password: hashedPassword,
            name,
            role: role || 'USER',
        });
        const token = (0, crypto_1.randomBytes)(3).toString('hex').toUpperCase();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        console.log({ token });
        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role: role || 'USER',
                },
            });
            await this.prisma.token.create({
                data: {
                    token,
                    userId: user.id,
                    expiresAt,
                },
            });
            return { user, token };
        }
        catch (error) {
            console.error('Failed to create token:', error);
            throw new Error('Token creation failed');
        }
    }
    async createToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: 'USER',
        };
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
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
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async validateToken(token) {
        console.log('validate token', token);
        if (!token) {
            console.error('Token is undefined or empty');
            throw new common_1.NotFoundException('Token is required');
        }
        try {
            console.log('Validating token:', token);
            const tokenRecord = await this.prisma.token.findUnique({
                where: { token },
                include: { user: true },
            });
            if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
                throw new common_1.NotFoundException('Invalid or expired token');
            }
            const updatedUser = await this.prisma.user.update({
                where: { id: tokenRecord.userId },
                data: { isVerified: true },
            });
            return tokenRecord.user;
        }
        catch (error) {
            console.error('Error validating token:', error);
            throw new common_1.NotFoundException('Invalid or expired token');
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
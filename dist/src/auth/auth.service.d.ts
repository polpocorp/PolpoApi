import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly usersService;
    private readonly emailService;
    private prisma;
    private readonly jwtService;
    constructor(usersService: UsersService, emailService: EmailService, prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    confirmToken(token: string): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
        };
        authToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
        accessToken: string;
    }>;
}

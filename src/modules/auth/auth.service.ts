import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    console.log('Register Auth Service');
    const { user, token } = await this.usersService.create(registerDto);
    /* await this.emailService.sendVerificationEmail(user.email, token); */
    return { message: 'User registered. Please verify your email.' };
  }

  async confirmToken(token: string) {
    const user = await this.usersService.validateToken(token);
    const authToken = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '7d', algorithm: 'HS256' },
    );
    if (!user) {
      throw new NotFoundException('Invalid or expired token');
    }
    return { user, authToken };
  }

  async login(loginDto: LoginDto) {
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
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const response = await this.usersService.createToken(user);

    if (!response || !response) {
      throw new UnauthorizedException('Failed to generate access token');
    }
    console.log(`Generated access token for user ${user.email}:`, response);
    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken: response,
    };
  }
}

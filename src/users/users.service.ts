import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { randomBytes } from 'crypto';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(registerDto: RegisterDto) {
    const { email, password, name, role } = registerDto;
    /*  const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log({ existingUser });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    } */
    console.log(email, password, role);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed password:`, hashedPassword);
    // Create user in Prisma
    const userPrisma = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userPrisma) {
      throw new ConflictException('Email already exists');
    }
    console.log(`Creating user with email:`, email);
    if (!email || !password) {
      throw new ConflictException('Email and password are required');
    }
    if (password.length < 6) {
      throw new ConflictException(
        'Password must be at least 6 characters long',
      );
    }
    if (!name) {
      throw new ConflictException('Name is required');
    }

    // Create user in Prisma
    console.log(`Creating user with email: ${email}`);
    console.log(`Hashed password: ${hashedPassword}`);
    console.log(`Role: ${role || 'USER'}`);
    console.log(`Name: ${name}`);
    console.log(`Creating user in Prisma...`);
    console.log(`User data:`, {
      email,
      password: hashedPassword,
      name,
      role: role || 'USER', // Default to 'USER' if no role is provided
    });

    // Generate a 6-character token
    const token = randomBytes(3).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    console.log({ token });
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || 'USER', // Default to 'USER' if no role is provided
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
    } catch (error) {
      console.error('Failed to create token:', error);
      throw new Error('Token creation failed');
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
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
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
      const updatedUser = await this.prisma.user.update({
        where: { id: tokenRecord.userId },
        data: { isVerified: true },
      });

      // Delete the token after validation
      /* await this.prisma.token.delete({ where: { token } }); */

      return tokenRecord.user;
    } catch (error) {
      console.error('Error validating token:', error);
      throw new NotFoundException('Invalid or expired token');
    }
  }
}

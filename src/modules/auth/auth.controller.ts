import {
  Controller,
  Post,
  Body,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('confirm')
  @HttpCode(200)
  async confirm(@Body('token') token: string) {
    console.log(`Received token in controller: ${token}`);
    if (!token) {
      throw new NotFoundException('Token is required');
    }
    const responseafterToken = await this.authService.confirmToken(token);
    return responseafterToken;
  }
}

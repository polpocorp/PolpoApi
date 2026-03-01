import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsEnum(Role)
  role: Role;
}

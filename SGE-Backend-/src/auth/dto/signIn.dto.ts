import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  correo: string;

  @IsString()
  contrasena: string;
}
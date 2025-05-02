import {
  IsString,
  IsEmail,
  Length,
  Matches,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
export class CreateUsuarioDto {
  @IsNumber()
  @IsOptional()
  id_usuario: number;

  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.',
  })
  contrasena: string;

  @IsString()
  @Length(1, 100)
  apellido_paterno: string;

  @IsString()
  @Length(1, 100)
  apellido_materno: string;

  @IsString()
  @Matches(/^\d{10,15}$/, {
    message: 'El teléfono debe contener entre 10 y 15 dígitos numéricos.',
  })
  telefono: string;

  @IsBoolean()
  esAdmin: boolean;
}

import {
  IsString,
  Length,
  Matches,
  IsEmail,
  IsNumber,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateMedicoDto {
  @IsNumber()
  @IsOptional()
  id_medico: number;

  @IsNumber({}, { message: 'La matrícula debe ser un número' })
  matricula: number;

  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El nombre no puede contener solo espacios en blanco',
  })
  nombre: string;

  @IsString({
    message: 'El apellido paterno debe ser una cadena de caracteres',
  })
  @Length(1, 100, {
    message: 'El apellido paterno debe tener entre 1 y 100 caracteres',
  })
  @IsNotEmpty({ message: 'El apellido paterno no puede estar vacío' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El apellido paterno no puede contener solo espacios en blanco',
  })
  apellido_paterno: string;

  @IsString({
    message: 'El apellido materno debe ser una cadena de caracteres',
  })
  @Length(1, 100, {
    message: 'El apellido materno debe tener entre 1 y 100 caracteres',
  })
  @IsNotEmpty({ message: 'El apellido materno no puede estar vacío' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El apellido materno no puede contener solo espacios en blanco',
  })
  apellido_materno: string;

  @IsString({ message: 'El teléfono debe ser una cadena de caracteres' })
  @Matches(/^\d{10,15}$/, {
    message: 'El teléfono debe contener entre 10 y 15 dígitos numéricos.',
  })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  telefono: string;

  @IsString({ message: 'La cédula debe ser una cadena de caracteres' })
  @Length(1, 50, { message: 'La cédula debe tener entre 1 y 50 caracteres' })
  @IsNotEmpty({ message: 'La cédula no puede estar vacía' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'La cédula no puede contener solo espacios en blanco',
  })
  cedula: string;

  @IsEmail({}, { message: 'El correo debe ser un correo electrónico válido' })
  @IsOptional()
  correo?: string;

  @IsNumber()
  @IsOptional()
  id_especialidad: number;
}

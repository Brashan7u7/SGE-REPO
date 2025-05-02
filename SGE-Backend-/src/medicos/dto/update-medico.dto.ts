import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  Length,
  Matches,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateMedicoDto } from './create-medico.dto';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {
  @IsOptional()
  @IsString({ message: 'El ID del médico debe ser una cadena de caracteres' })
  @Length(1, 50, {
    message: 'El ID del médico debe tener entre 1 y 50 caracteres',
  })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El ID del médico no puede contener solo espacios en blanco',
  })
  id_medico?: number;

  @IsOptional()
  @IsNumber({}, { message: 'La matrícula debe ser un número' })
  matricula?: number;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El nombre no puede contener solo espacios en blanco',
  })
  nombre?: string;

  @IsOptional()
  @IsString({
    message: 'El apellido paterno debe ser una cadena de caracteres',
  })
  @Length(1, 100, {
    message: 'El apellido paterno debe tener entre 1 y 100 caracteres',
  })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El apellido paterno no puede contener solo espacios en blanco',
  })
  apellido_paterno?: string;

  @IsOptional()
  @IsString({
    message: 'El apellido materno debe ser una cadena de caracteres',
  })
  @Length(1, 100, {
    message: 'El apellido materno debe tener entre 1 y 100 caracteres',
  })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El apellido materno no puede contener solo espacios en blanco',
  })
  apellido_materno?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de caracteres' })
  @Matches(/^\d{10,15}$/, {
    message: 'El teléfono debe contener entre 10 y 15 dígitos numéricos.',
  })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La cédula debe ser una cadena de caracteres' })
  @Length(1, 50, { message: 'La cédula debe tener entre 1 y 50 caracteres' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'La cédula no puede contener solo espacios en blanco',
  })
  cedula?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo debe ser un correo electrónico válido' })
  correo?: string;

  @IsNumber()
  @IsOptional()
  id_especialidad: number;
}

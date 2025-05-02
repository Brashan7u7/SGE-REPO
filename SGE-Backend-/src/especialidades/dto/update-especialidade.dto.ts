import { PartialType } from '@nestjs/mapped-types';
import { CreateEspecialidadeDto } from './create-especialidade.dto';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateEspecialidadeDto extends PartialType(CreateEspecialidadeDto) {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(1, 100, { message: 'El nombre debe tener al menos 1 carácter' })
  @Matches(/^(\S.*\S|\S)$/, { message: 'El nombre no puede contener solo espacios en blanco' })
  nombre?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  @Length(1, 255, { message: 'La descripción debe tener al menos 1 carácter' })
  @Matches(/^(\S.*\S|\S)$/, { message: 'La descripción no puede contener solo espacios en blanco' }) 
  descripcion?: string;
}

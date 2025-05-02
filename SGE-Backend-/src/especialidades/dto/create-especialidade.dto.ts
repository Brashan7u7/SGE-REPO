import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateEspecialidadeDto {
  @IsNumber()
  @IsOptional()
  id_especialidad: number;

  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(1, 100, { message: 'El nombre debe tener al menos 1 carácter' })
  @IsNotEmpty({ message: 'El nombre de la especialidad no puede estar vacío' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'El nombre no puede contener solo espacios en blanco',
  })
  nombre: string;

  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  @Length(1, 255, { message: 'La descripción debe tener al menos 1 carácter' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @Matches(/^(\S.*\S|\S)$/, {
    message: 'La descripción no puede contener solo espacios en blanco',
  })
  descripcion: string;
}

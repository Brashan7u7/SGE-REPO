import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateObservacioneDto {
  @IsNumber()
  @IsOptional()
  id_observacion: number;

  @IsNumber()
  @IsNotEmpty()
  id_expediente: number;

  @IsString()
  @Length(1, 1024)
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  @IsNotEmpty()
  fechahora_creacion: string;
}

import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMovimientoDto {
  @IsNumber()
  @IsOptional()
  id_movimiento: number;

  @IsNumber()
  @IsOptional()
  id_actor: number;

  @IsString()
  @IsIn(['Administrador', 'Arimac'], {
    message: 'tipo_actor debe ser Administrador o Arimac',
  })
  tipo_actor: string;

  @IsString()
  @IsIn(['Apertura', 'Surtimiento', 'Archivo'], {
    message: 'tipo_accion debe ser Apertura, Surtimiento o Archivo',
  })
  tipo_accion: string;

  @IsDateString(
    {},
    { message: 'fecha_accion debe ser una fecha válida en formato ISO 8601' },
  )
  fecha_accion: string;
}

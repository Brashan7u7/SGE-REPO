import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsIn,
  IsDateString,
  Length,
  IsEmail,
} from 'class-validator';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) {
  @IsOptional()
  @IsNumber()
  id_prestamo?: number;

  @IsOptional()
  @IsNumber()
  folio?: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  nombre?: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  categoria?: string;

  @IsOptional()
  @IsString()
  serv_especialidad?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  consultorio?: string;

  @IsOptional()
  @IsString()
  @IsIn(['M', 'V'])
  turno?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  telefono?: string; 

  @IsOptional()
  @IsEmail()
  correo?: string; 

  @IsOptional()
  @IsString()
  @Length(1, 255)
  tipo_solicitante?: string;

  @IsOptional()
  @IsDateString()
  fecha_solicitud?: string;

  @IsOptional()
  @IsDateString()
  fecha_prestamo?: string;

  @IsOptional()
  @IsDateString()
  fecha_devolucion?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Pendiente', 'Aprobado', 'Devuelto', 'Rechazado'])
  estado?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  datos_solicitante?: string;

  @IsOptional()
  @IsString()
  @IsIn([
    'Investigacion',
    'Auditoria y Superviciones',
    'Auditoria Judicial',
    'Capital Constitutivo',
    'Atencion Medica',
  ])
  motivo?: string; 

  @IsOptional()
  @IsString()
  @Length(1, 500)
  observaciones?: string;

  @IsOptional()
  @IsNumber()
  id_expediente?: number;
}

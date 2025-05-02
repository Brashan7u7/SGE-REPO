import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsIn,
  Length,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreatePrestamoDto {
  @IsNumber()
  @IsOptional()
  id_prestamo?: number;



  @IsNumber()
  @IsNotEmpty()
  folio: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @IsOptional()
  matricula?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  categoria: string;

  @IsString()
  @IsNotEmpty()
  serv_especialidad: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  consultorio: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['M', 'V'])
  turno: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsDateString()
  fecha_solicitud: string;

  @IsDateString()
  @IsOptional()
  fecha_prestamo?: string;

  @IsOptional()
  @IsDateString()
  fecha_devolucion?: string;

  @IsString()
  @IsOptional()
  @IsIn(['Pendiente', 'Aprobado', 'Devuelto', 'Rechazado'])
  estado: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  datos_solicitante?: string;

  @IsString()
  @IsIn([
    'Investigacion',
    'Auditoria y Superviciones',
    'Auditoria Judicial',
    'Capital Constitutivo',
    'Atencion Medica',
  ])
  motivo: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  observaciones?: string;

  @IsOptional()
  @IsNumber()
  id_expediente?: number;

  @IsOptional()
  @IsIn(['original', 'prestado'])
  prestamo_tipo?: string;

  @IsOptional()
  @IsBoolean()
  adminAprobado?: boolean;

}

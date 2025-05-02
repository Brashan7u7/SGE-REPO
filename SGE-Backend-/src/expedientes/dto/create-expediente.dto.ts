import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Length,
  IsIn,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

export class CreateExpedienteDto {
  @IsNumber()
  @IsOptional()
  id_expediente: number;

  @IsNumber()
  @IsNotEmpty()
  folio: number;

  @IsString()
  @IsIn(['Seccion I', 'Seccion II', 'Donador de sangre', 'SISI o Aut Judicial'])
  @IsNotEmpty()
  vigencia_documental: string;

  @IsString()
  @Length(1, 255)
  @IsOptional()
  nota_medica: string;

  @IsString()
  @IsIn(['Expediente', 'Nota_clinica'])
  @IsNotEmpty()
  tipo_documento: string;

  @IsString()
  @IsNotEmpty()
  num_seg_social: string;

  @IsString()
  @IsNotEmpty()
  agregado_medico: string;

  @IsString()
  @Length(18, 18)
  @IsNotEmpty()
  curp: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  apellido_materno: string;

  @IsString()
  @Length(1, 1)
  @IsNotEmpty()
  @IsIn(['M', 'F'])
  sexo: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  domicilio: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_apertura: string;

  @IsDateString()
  @IsOptional()
  fecha_cierre: string;

  @IsString()
  @IsOptional()
  umf_adscripcion: string;

  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  delegacion: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['M', 'V'])
  turno_adscripcion: string;

  @IsNumber()
  @IsOptional()
  legajo: number;

  @IsNumber()
  @IsOptional()
  fojas: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  consultorio_adscripcion: string;

  @IsString()
  @IsOptional()
  @Length(0, 15)
  telefono: string;

  @IsDateString()
  @IsNotEmpty()
  fechahora_creacion: string;

  @IsNumber()
  @IsOptional()
  id_umf;

  @IsBoolean()
  @IsNotEmpty()
  super_expediente;
}


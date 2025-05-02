import { Medico } from 'src/medicos/entities/medico.entity';
import { Movimiento } from 'src/movimientos/entities/movimiento.entity';
import { Observacione } from 'src/observaciones/entities/observacione.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Umf } from 'src/umf/entities/umf.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('Expedientes')
export class Expediente {
  @PrimaryGeneratedColumn()
  id_expediente: number;

  @Column({ type: 'int', nullable: true })
  folio: number;

  @Column({ type: 'varchar', length: 20 })
  vigencia_documental: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nota_medica: string;

  @Column({ type: 'varchar', length: 50 })
  tipo_documento: string;

  @Column({ type: 'varchar', length: 20 })
  num_seg_social: string;

  @Column({ type: 'varchar', length: 100 })
  agregado_medico: string;

  @Column({ type: 'varchar', length: 18 })
  curp: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_paterno: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_materno: string;

  @Column({ type: 'varchar', length: 1 })
  sexo: string;

  @Column({ type: 'varchar', length: 255 })
  domicilio: string;

  @Column({ type: 'timestamp' })
  fecha_apertura: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_cierre: Date;

  @Column({ type: 'varchar', nullable: true })
  umf_adscripcion: string;

  @Column({ type: 'varchar', length: 100 })
  delegacion: string;

  @Column({ type: 'varchar', length: 1 })
  turno_adscripcion: string;

  @Column({ type: 'int', nullable: true })
  legajo: number;

  @Column({ type: 'int', nullable:true })
  fojas: number;

  @Column({ type: 'varchar', length: 255 })
  consultorio_adscripcion: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  telefono: string;

  @Column({ type: 'timestamp' })
  fechahora_creacion: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  super_expediente: boolean;

  @OneToMany(
    () => Prestamo, 
    (prestamo: Prestamo) => prestamo.expediente)
  prestamo: Prestamo[];

  @OneToMany(
    () => Movimiento,
    (movimiento: Movimiento) => movimiento.expedientes,
  )
  movimiento: Prestamo[];

  @ManyToOne(() => Umf, (umf: Umf) => umf.expedientes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  umf: Umf;

  @OneToMany(
    () => Observacione,
    (observacione: Observacione) => observacione.expediente,
  )
  observacione: Observacione[];

  @ManyToOne(() => Medico, (medico: Medico) => medico.expedientes, {
    onDelete: 'SET NULL',
  })
  medico: Medico;
}

import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('Prestamos')
export class Prestamo {
  @PrimaryGeneratedColumn()
  id_prestamo: number;

  @Column({ default: 0 })
  @Index()
  folio: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ nullable: true })
  matricula?: string;

  @Column({ length: 100 })
  categoria: string;

  @Column()
  serv_especialidad: string;

  @Column({ length: 100 })
  consultorio: string;

  @Column({ type: 'enum', enum: ['original', 'prestado'], nullable: true })
  prestamo_tipo?: string;

  @Column({ type: 'enum', enum: ['M', 'V'] })
  turno: string;

  @Column({ length: 15, nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  @Index()
  correo?: string;

  @Column({
    type: 'enum',
    enum: ['Pendiente', 'Aprobado', 'Devuelto', 'Rechazado'],
  })
  estado: string;

  @Column({ length: 255, nullable: true })
  datos_solicitante?: string;

  @Column({
    type: 'enum',
    enum: [
      'Investigacion',
      'Auditoria y Superviciones',
      'Auditoria Judicial',
      'Capital Constitutivo',
      'Atencion Medica',
    ],
  })
  motivo: string;

  @Column({ length: 500, nullable: true })
  observaciones?: string;

  @Column({ nullable: true })
  id_expediente?: number;

  @Column({ type: 'timestamp' })
  fecha_solicitud: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_prestamo: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_devolucion?: string;

  @ManyToOne(
    () => Expediente,
    (expediente: Expediente) => expediente.prestamo,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'id_expediente' })
  expediente: Expediente;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.prestamos, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: Usuario;
}

import { Especialidad } from 'src/especialidades/entities/especialidad.entity';
import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Movimiento } from 'src/movimientos/entities/movimiento.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('Medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id_medico: number;

  @Column({ type: 'int' })
  matricula: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_paterno: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_materno: string;

  @Column({ type: 'varchar', length: 15 })
  telefono: string;

  @Column({ type: 'varchar', length: 50 })
  cedula: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  correo: string;

  @ManyToOne(
    () => Especialidad,
    (especialidad: Especialidad) => especialidad.medicos,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @OneToMany(
    ()=> Expediente,
    (expediente: Expediente) => expediente.medico,
  )
  expedientes:Expediente[];

  @OneToMany(
    ()=> Movimiento,
    (movimiento: Movimiento) => movimiento.medicos,
  )
  movimientos:Movimiento[];
}

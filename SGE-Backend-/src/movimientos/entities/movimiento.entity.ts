import { Especialidad } from 'src/especialidades/entities/especialidad.entity';
import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Medico } from 'src/medicos/entities/medico.entity';
import { Umf } from 'src/umf/entities/umf.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn({ name: 'id_movimiento' })
  id_movimiento: number;

  

  @Column({ type: 'varchar', length: 100 })
  tipo_actor: string;

  @Column({ type: 'varchar', length: 100 })
  tipo_accion: string;

  @Column({ type: 'timestamp' })
  fecha_accion: Date;
  @Column({ type: 'text', nullable: true })
  descripcion_accion: string;

  @ManyToOne(
    () => Expediente,
    (expediente: Expediente) => expediente.movimiento,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'id_expediente' })
  expedientes: Expediente;

  @ManyToOne(() => Medico, (medico: Medico) => medico.movimientos, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_medico' })
  medicos: Medico;

  @ManyToOne(() => Umf, (umf: Umf) => umf.movimientos, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_umf' })
  umf: Umf;

  @ManyToOne(
    () => Especialidad,
    (especialidad: Especialidad) => especialidad.movimientos,
    {
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidad;

  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.movimientos, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_usuario' })
  usuarios: Usuario;
}

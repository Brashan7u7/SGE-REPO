import { Medico } from 'src/medicos/entities/medico.entity';
import { Movimiento } from 'src/movimientos/entities/movimiento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Especialidades')
export class Especialidad {
  @PrimaryGeneratedColumn()
  id_especialidad: number;

  @Column({ nullable: false, unique: true })
  nombre: string;

  @Column({ nullable: false, unique: false })
  descripcion: string;

  @OneToMany(
    ()=>Medico,
    (medico:Medico)=> medico.especialidad,
  )
  
  medicos:Medico[];

  @OneToMany(
    ()=> Movimiento,
    (movimiento: Movimiento) => movimiento.especialidad,
  )
  movimientos: Movimiento[];

}

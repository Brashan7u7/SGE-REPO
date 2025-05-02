import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Movimiento } from 'src/movimientos/entities/movimiento.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UMFS')
export class Umf {
  @PrimaryGeneratedColumn()
  id_umf: number;

  @Column({ type: 'int', nullable: false })
  cve_delegacion_imss: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  des_delegacion_imss: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  cve_presupuestal: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  unidad_medica: string;

  @OneToMany(() => Expediente, (expediente: Expediente) => expediente.umf)
  expedientes: Expediente[];

  @OneToMany(
    ()=> Movimiento,
    (movimiento: Movimiento) => movimiento.umf,
  )
  movimientos: Movimiento[];
}

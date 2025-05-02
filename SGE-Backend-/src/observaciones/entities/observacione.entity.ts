import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Observaciones')
export class Observacione {
  @PrimaryGeneratedColumn()
  id_observacion: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fechahora_creacion: string;

  @ManyToOne(
    () => Expediente,
    (expediente: Expediente) => expediente.observacione,
    {
      onDelete: 'SET NULL',
    },
  )
  expediente: Expediente;
}

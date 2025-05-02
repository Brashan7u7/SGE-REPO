import { Movimiento } from 'src/movimientos/entities/movimiento.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 100 })
  contrasena: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_paterno: string;

  @Column({ type: 'varchar', length: 100 })
  apellido_materno: string;

  @Column({ type: 'varchar', length: 15 })
  telefono: string;

  @Column({ type: 'boolean', default: false })
  esAdmin: boolean;

  @OneToMany(
    ()=>Prestamo,
    (prestamo: Prestamo) => prestamo.id_usuario,
  )
  prestamos:Prestamo[];

  @OneToMany(
    ()=>Movimiento,
    (movimiento:Movimiento) => movimiento.usuarios,
  )
  movimientos:Movimiento[];

  
}

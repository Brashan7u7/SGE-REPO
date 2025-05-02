import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Repository } from 'typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
    @InjectRepository(Expediente)
    private readonly expedientesRepository: Repository<Expediente>,
  ) {}

  findAll(): Promise<Movimiento[]> {
    return this.movimientoRepository.find({
      relations: ['expedientes', 'usuarios'],
    });
  }
  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }

  async find(id: number): Promise<Movimiento[] | null> {
    return this.movimientoRepository.find({
      where: {
        usuarios: {
          id_usuario: id,
        },
      },
      relations: ['expedientes', 'usuarios', 'medicos', 'especialidad', 'umf'],
    });
  }
  
}

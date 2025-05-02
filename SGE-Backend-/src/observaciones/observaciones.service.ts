import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateObservacioneDto } from './dto/create-observacione.dto';
import { Observacione } from './entities/observacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';

@Injectable()
export class ObservacionesService {
  constructor(
    @InjectRepository(Observacione)
    private observacioneRepository: Repository<Observacione>,
    @InjectRepository(Expediente)
    private expedienteRepository: Repository<Expediente>,
  ) {}
  async create(
    createObservacioneDto: CreateObservacioneDto,
  ): Promise<Observacione> {
    const expediente = await this.expedienteRepository.findOne({
      where: { id_expediente: createObservacioneDto.id_expediente },
    });

    if (!expediente) {
      throw new NotFoundException('Expediente no encontrado');
    }

    const nuevaObservacion = this.observacioneRepository.create({
      ...createObservacioneDto,
      expediente: expediente, 
    });
    return this.observacioneRepository.save(nuevaObservacion);
  }

  findAll() {
    return this.observacioneRepository.find({ relations: ['expediente'] });
  }

  findOne(id: number) {
    return this.observacioneRepository.findOne({
      where: { id_observacion: id },
      relations: ['expediente'],
    });
  }

  async findByExpediente(id_expediente: number) {
    return this.observacioneRepository.find({
      where: { expediente: { id_expediente } },
      relations: ['expediente'],
    });
  }
  
}

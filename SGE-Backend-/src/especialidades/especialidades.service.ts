import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(
    createEspecialidadeDto: CreateEspecialidadeDto,
  ): Promise<Especialidad> {
    return this.especialidadRepository.save(createEspecialidadeDto);
  }

  findAll(): Promise<Especialidad[]> {
    return this.especialidadRepository.find();
  }

  //findOne(id: number) {
  //return `This action returns a #${id} especialidade`;
  //}

  async update(id: number, updateEspecialidadeDto: UpdateEspecialidadeDto): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.findOne({
      where: { id_especialidad: id },
    });

    if (!especialidad) {
      throw new NotFoundException(`Especialidad #${id} no fue encontrada`);
    }

    Object.assign(especialidad, updateEspecialidadeDto);
    return this.especialidadRepository.save(especialidad);
  }

  async remove(id: number): Promise<void> {
    const result = await this.especialidadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Especialidad #${id} no fue encontrada`);
    }
  }
}

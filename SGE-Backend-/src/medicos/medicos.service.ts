import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { Repository } from 'typeorm';
import { Especialidad } from 'src/especialidades/entities/especialidad.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
    @InjectRepository(Especialidad)
    private especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    const especialidadFind = await this.especialidadRepository.findOne({
      where: { id_especialidad: createMedicoDto.id_especialidad },
    });
    if (!especialidadFind) {
      throw new NotFoundException('Especialidad no encontrada');
    }

    const body = this.medicoRepository.create(createMedicoDto);
    return this.medicoRepository.save(body);
  }

  findAll() {
    return this.medicoRepository.find({relations:['especialidad']});
  }

  findOne(id: number) {
    return this.medicoRepository.findOne({ where: { id_medico: id }, relations:['especialidad'] });
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { id_medico: id },
      relations: ['especialidad'],
    });

    if (!medico) {
      throw new NotFoundException(`Medico con ID ${id} no encontrado`);
    }

    if(updateMedicoDto.id_especialidad !== undefined){
      const especialidadFind = await this.especialidadRepository.findOne({
        where: { id_especialidad: updateMedicoDto.id_especialidad },
      });
      if (!especialidadFind) {
        throw new NotFoundException('Especialidad no encontrada');
      }
      medico.especialidad = especialidadFind;
    }

    Object.assign(medico, updateMedicoDto);
    return this.medicoRepository.save(medico);
  }

  async remove(id: number): Promise<void> {
    const medico = await this.medicoRepository.findOne({
      where: { id_medico: id },
    });
    if (!medico) {
      throw new NotFoundException(`Medico con ID ${id} no encontrado`);
    }

    await this.medicoRepository.remove(medico);
  }
}

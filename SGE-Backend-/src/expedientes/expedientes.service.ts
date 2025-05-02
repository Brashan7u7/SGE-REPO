import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { UpdateExpedienteDto } from './dto/update-expediente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expediente } from './entities/expediente.entity';
import { Repository } from 'typeorm';
import { Umf } from 'src/umf/entities/umf.entity';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expediente)
    private expedienteRepository: Repository<Expediente>,
    @InjectRepository(Umf)
    private umfRepository: Repository<Umf>,
  ) {}

  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expediente> {
    const body = this.expedienteRepository.create({
      ...createExpedienteDto,
    });

    return this.expedienteRepository.save(body);
  }

  async findAll(
    page: number,
    limit: number,
    num_seg_social?: string,
    vigencia_documental?: string,
  ) {
    const query = this.expedienteRepository.createQueryBuilder('Expedientes');
    if (vigencia_documental) {
      query.andWhere(
        'LOWER("Expedientes".vigencia_documental) LIKE LOWER(:vigencia_documental)',
        { vigencia_documental: `%${vigencia_documental}` },
      );
    }

    if (num_seg_social) {
      query.andWhere(
        'LOWER("Expedientes".num_seg_social) LIKE LOWER(:num_seg_social)',
        { num_seg_social: `%${num_seg_social}%` },
      );
    }

    query.orderBy('Expedientes.fechahora_creacion', 'DESC');

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number): Promise<Expediente> {
    return this.expedienteRepository.findOne({ where: { id_expediente: id } });
  }

  async update(id: number, updateExpedienteDto: UpdateExpedienteDto) {
    const expediente = await this.expedienteRepository.findOne({
      where: { id_expediente: id },
    });
    if (!expediente) {
      throw new Error(`Expediente con ID ${id} no encontrado`);
    }
    Object.assign(expediente, updateExpedienteDto);
    return this.expedienteRepository.save(expediente);
  }

  async remove(id: number): Promise<void> {
    const result = await this.expedienteRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Expediente con ID ${id} no encontrado`);
    }
  }
}

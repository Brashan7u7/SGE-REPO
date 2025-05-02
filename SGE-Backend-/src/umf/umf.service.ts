import { Injectable } from '@nestjs/common';
import { CreateUmfDto } from './dto/create-umf.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Umf } from './entities/umf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UmfService {
  constructor(
    @InjectRepository(Umf)
    private umfRepository: Repository<Umf>,
  ) {}

  async create(createUmfDto: CreateUmfDto): Promise<Umf> {
    return this.umfRepository.save(createUmfDto);
  }

  findAll(): Promise<Umf[]> {
    return this.umfRepository.find();
  }

  findOne(id: number): Promise<Umf> {
    return this.umfRepository.findOne({ where: { id_umf: id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.umfRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Umf con ID ${id} no encontrado`);
    }
  }

  
}

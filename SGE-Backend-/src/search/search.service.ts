import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Umf } from 'src/umf/entities/umf.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Umf)
    private readonly itemRepository: Repository<Umf>,
    @InjectRepository(Expediente)
    private readonly expedienteRepository: Repository<Expediente>,
  ) {}

  async search(query: string, limit: number, offset: number) {
    return this.itemRepository
      .createQueryBuilder('UMFS')
      .where('UMFS.unidad_medica LIKE :query', { query: `%${query}%` })
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async searchDelegations() {
    const delegaciones = await this.itemRepository
      .createQueryBuilder('UMFS')
      .select('DISTINCT UMFS.des_delegacion_imss')
      .getRawMany();
    return delegaciones.map((delegacion) => delegacion.des_delegacion_imss);
  }

  async findByDelegation(delegacion: string): Promise<Umf[]> {
    return this.itemRepository.find({
      where: { des_delegacion_imss: delegacion },
      select: ['unidad_medica'],
    });
  }

  async findByNSSocial(nssocial: string): Promise<Expediente[]> {
    return this.expedienteRepository.find({
      where: { num_seg_social: nssocial },
    });
  }
}

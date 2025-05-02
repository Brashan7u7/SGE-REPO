import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Umf } from 'src/umf/entities/umf.entity';
import { Repository } from 'typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService,
    @InjectRepository(Umf)
    private readonly itemRepository: Repository<Umf>,
    @InjectRepository(Expediente)
    private readonly expedienteRepository: Repository<Expediente>,
  ) {}

  @Get('autocomplete')
  async autocomplete(
    @Query('query') query: string,
    @Query('limit') limit = 5,
    @Query('offset') offset = 0,
  ) {
    return this.searchService.search(query, limit, offset);
  }
  @Get('delegations')
  async searchDelegations() {
    return this.searchService.searchDelegations(); 
  }

  @Get('delegation/:delegacion')
  async findByDelegation(@Param('delegacion') delegacion: string) {
    return this.searchService.findByDelegation(delegacion);
  }
  
  @Get('nssocial/:nssocial')
  async findByNSSocial(@Param('nssocial') nssocial: string) {
    return this.searchService.findByNSSocial(nssocial);
  }
  
}

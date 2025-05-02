import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umf } from 'src/umf/entities/umf.entity'; 
import { Expediente } from 'src/expedientes/entities/expediente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Umf, Expediente]),
  ],
  controllers: [SearchController], 
  providers: [SearchService], 
  exports: [SearchService],
})
export class SearchModule {}

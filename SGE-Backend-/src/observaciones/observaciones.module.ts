import { Module } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Observacione } from './entities/observacione.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Observacione, Expediente])],
  controllers: [ObservacionesController],
  providers: [ObservacionesService],
})
export class ObservacionesModule {}

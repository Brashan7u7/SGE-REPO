import { forwardRef, Module } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expediente } from './entities/expediente.entity';
import { Umf } from 'src/umf/entities/umf.entity';
import { Observacione } from 'src/observaciones/entities/observacione.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expediente, Umf, Observacione]),
    forwardRef(() => AuthModule), 
  ],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
})
export class ExpedientesModule {}

import { Module } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { Prestamo } from './entities/prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from 'src/medicos/entities/medico.entity';

import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, Medico, Expediente, Usuario])],
  controllers: [PrestamosController],
  providers: [PrestamosService],
})
export class PrestamosModule {}

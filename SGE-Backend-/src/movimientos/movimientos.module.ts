import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { MovimientoSubscriber } from './movimiento.subscriber';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule, 
    TypeOrmModule.forFeature([Movimiento, Expediente]),
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService, MovimientoSubscriber],
})
export class MovimientosModule {}

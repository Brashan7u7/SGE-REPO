import { Controller, Get, Param } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
// import { CreateMovimientoDto } from './dto/create-movimiento.dto';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.find(+id);
  }
}

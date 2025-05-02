import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Get('todos/:id')
  findAll(@Param('id') id: string) {
    return this.prestamosService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestamosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrestamoDto: UpdatePrestamoDto,
  ) {
    return this.prestamosService.update(+id, updatePrestamoDto);
  }
  @Patch('autorizar/:id')
  autorizar(
    @Param('id') id: string,
    @Body() updatePrestamoDto: UpdatePrestamoDto,
  ) {
    return this.prestamosService.autorizar(+id, updatePrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamosService.remove(+id);
  }

  @Post('crearprestamo')
  async crearPrestamo(
    @Body() createPrestamoDto: CreatePrestamoDto,
    @Req() req,
  ) {
    const idusuario = req.user || req.id_usuario;
    const prestamo = await this.prestamosService.crearPrestamo(
      createPrestamoDto,
      idusuario,
    );
    return prestamo;
  }
}

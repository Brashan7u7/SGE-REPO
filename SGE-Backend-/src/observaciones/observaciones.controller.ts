import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { CreateObservacioneDto } from './dto/create-observacione.dto';

@Controller('observaciones')
export class ObservacionesController {
  constructor(private readonly observacionesService: ObservacionesService) {}

  @Post()
  create(@Body() createObservacioneDto: CreateObservacioneDto) {
    return this.observacionesService.create(createObservacioneDto);
  }

  @Get()
  findAll() {
    return this.observacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.observacionesService.findOne(+id);
  }

  @Get('expediente/:id')
  findByExpediente(@Param('id') id: string) {
    return this.observacionesService.findByExpediente(+id);
  }
}

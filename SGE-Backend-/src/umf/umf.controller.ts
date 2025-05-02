import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UmfService } from './umf.service';
import { CreateUmfDto } from './dto/create-umf.dto';

@Controller('umf')
export class UmfController {
  constructor(private readonly umfService: UmfService) {}

  @Post()
  create(@Body() createUmfDto: CreateUmfDto) {
    return this.umfService.create(createUmfDto);
  }

  @Get()
  findAll() {
    return this.umfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.umfService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umfService.remove(+id);
  }
  
}

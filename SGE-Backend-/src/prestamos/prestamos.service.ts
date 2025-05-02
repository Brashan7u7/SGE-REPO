import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';

import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class PrestamosService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamosRepository: Repository<Prestamo>,
    @InjectRepository(Expediente)
    private readonly expedientesRepository: Repository<Expediente>,
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(id_expediente: number) {
    return this.prestamosRepository.find({
      relations: ['expediente'],
      where: { id_expediente },
      order: { fecha_solicitud: 'DESC' },
    });
  }

  async findOne(id: number) {
    return this.prestamosRepository.findOne({
      where: { id_expediente: id },
      relations: ['expediente'],
    });
  }

  async update(
    id: number,
    updatePrestamoDto: UpdatePrestamoDto,
  ): Promise<Prestamo> {
    const prestamo = await this.prestamosRepository.findOne({
      where: { id_prestamo: id },
      relations: ['expediente'],
    });

    if (!prestamo) {
      throw new NotFoundException(`Prestamo con ID ${id} no encontrado`);
    }

    Object.assign(prestamo, updatePrestamoDto);
    return this.prestamosRepository.save(prestamo);
  }
  async autorizar(
    id: number,
    updatePrestamoDto: UpdatePrestamoDto,
  ): Promise<Prestamo> {
    const prestamo = await this.prestamosRepository.findOne({
      where: { id_prestamo: id },
      relations: ['expediente'],
    });

    if (!prestamo) {
      throw new NotFoundException(`Prestamo con ID ${id} no encontrado`);
    }

    const expediente = await this.expedientesRepository.findOne({
      where: { id_expediente: updatePrestamoDto.id_expediente },
    });

    if (!expediente) {
      throw new NotFoundException('Expediente no encontrado');
    }
    const prestamo_tipo: 'original' | 'prestado' | null =
      await this.getPrestamoTipo(expediente.id_expediente);

    Object.assign(prestamo, {
      ...updatePrestamoDto,
      prestamo_tipo,
    });

    return this.prestamosRepository.save(prestamo);
  }

  async remove(id: number): Promise<void> {
    const prestamo = await this.prestamosRepository.findOne({
      where: { id_prestamo: id },
    });
    if (!prestamo) {
      throw new NotFoundException(`Prestamo #${id} no encontrado`);
    }
    await this.prestamosRepository.remove(prestamo);
  }

  async crearPrestamo(
    dto: CreatePrestamoDto,
    id_usuario: any,
  ): Promise<Prestamo> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id_usuario: id_usuario.sub },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const rol: 'admin' | 'arimac' = usuario.esAdmin ? 'admin' : 'arimac';

    // Buscar el expediente
    const expediente = await this.expedientesRepository.findOne({
      where: { id_expediente: dto.id_expediente },
    });

    if (!expediente) {
      throw new NotFoundException('Expediente no encontrado');
    }

    let estado: 'Pendiente' | 'Aprobado';

    if (!expediente.super_expediente) {
      estado = 'Aprobado';
    } else {
      estado = rol === 'arimac' ? 'Pendiente' : 'Aprobado';
    }

    let prestamo_tipo: 'original' | 'prestado' | null = null;

    if (!(expediente.super_expediente && rol === 'arimac')) {
      prestamo_tipo = await this.getPrestamoTipo(expediente.id_expediente);
    }

    const nuevoPrestamo = this.prestamosRepository.create({
      ...dto,
      estado,
      prestamo_tipo,
      id_usuario: { id_usuario: usuario.id_usuario } as Usuario,
      expediente,
      fecha_solicitud: new Date(),
      fecha_prestamo: estado === 'Aprobado' ? new Date() : undefined,
    });

    return this.prestamosRepository.save(nuevoPrestamo);
  }

  // Función auxiliar para determinar el tipo de préstamo
  private async getPrestamoTipo(
    expedienteId: number,
  ): Promise<'original' | 'prestado'> {
    const approvedLoan = await this.prestamosRepository.findOne({
      where: {
        id_expediente: expedienteId,
        estado: 'Aprobado',
        prestamo_tipo: 'original',
      },
    });

    return approvedLoan ? 'prestado' : 'original';
  }
}

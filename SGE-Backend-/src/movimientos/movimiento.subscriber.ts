// movimiento.subscriber.ts
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { ClsService } from 'nestjs-cls';
import { Injectable } from '@nestjs/common';

@EventSubscriber()
@Injectable()
export class MovimientoSubscriber implements EntitySubscriberInterface {
  static clsService: ClsService;

  static setClsService(cls: ClsService) {
    MovimientoSubscriber.clsService = cls;
  }

  listenTo() {
    return Object;
  }

  private async crearMovimiento(
    evento: InsertEvent<any> | UpdateEvent<any> | RemoveEvent<any>,
    tipoAccion: string,
  ) {
    if (evento.metadata.name === 'Movimiento') return;

    const usuarioId = MovimientoSubscriber.clsService?.get<number>('usuarioId');
    if (!usuarioId) {
      
      return;
    }

    const movimiento = new Movimiento();
    movimiento.tipo_actor = evento.metadata.tableName;
    movimiento.tipo_accion = tipoAccion;
    movimiento.fecha_accion = new Date();
    movimiento.usuarios = { id_usuario: usuarioId } as any;

    const entity = evento.entity || (evento as any).databaseEntity;

    if (entity?.id_expediente) {
      movimiento.expedientes = { id_expediente: entity.id_expediente } as any;
    }

    // 📝 Generar descripción de lo que pasó
    if (tipoAccion === 'crear') {
      movimiento.descripcion_accion = `Se creó con los datos: ${JSON.stringify(entity)}`;
    } else if (tipoAccion === 'eliminar') {
      movimiento.descripcion_accion = `Se eliminó con los datos: ${JSON.stringify(entity)}`;
    } else if (tipoAccion === 'actualizar') {
      const cambios = [];
      const antes = (evento as any).databaseEntity || {};
      const despues = evento.entity || {};

      for (const key in despues) {
        const valorAntes = antes[key];
        const valorDespues = despues[key];

        if (valorAntes instanceof Date && valorDespues instanceof Date) {
          const fechaAntes = valorAntes.toISOString();
          const fechaDespues = valorDespues.toISOString();
          if (fechaAntes !== fechaDespues) {
            cambios.push(`${key}: '${fechaAntes}' → '${fechaDespues}'`);
          }
        } else if (
          typeof valorAntes === 'object' ||
          typeof valorDespues === 'object'
        ) {
          continue; // omitimos relaciones u otros objetos
        } else if (valorAntes !== valorDespues) {
          cambios.push(`${key}: '${valorAntes}' → '${valorDespues}'`);
        }
      }

      movimiento.descripcion_accion = cambios.length
        ? `Se actualizaron los campos: ${cambios.join(' | ')}`
        : 'Se actualizó sin cambios visibles.';
    }

    await evento.manager.save(Movimiento, movimiento);
  }

  async afterInsert(event: InsertEvent<any>) {
    await this.crearMovimiento(event, 'crear');
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await this.crearMovimiento(event, 'actualizar');
  }

  async afterRemove(event: RemoveEvent<any>) {
    await this.crearMovimiento(event, 'eliminar');
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObservacionesService } from '../../../services/observaciones.service';
import { ModalErroresComponent } from '../modal-errores/modal-errores.component';
import { CommonModule } from '@angular/common';
import { ModalExitoComponent } from '../modal-exito/modal-exito.component';

@Component({
  selector: 'app-modal-observaciones',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalExitoComponent, ModalErroresComponent],
  templateUrl: './modal-observaciones.component.html',
  styleUrl: './modal-observaciones.component.scss',
})
export class ModalObservacionesComponent {
  @Input() expediente: any;
  @Output() onClose = new EventEmitter<void>();
  mostrarModalExito: boolean = false;
  mostrarModalError: boolean = false;
  mensajeError: string = '';
  errores: any[] = [];
  observaciones: any = {
    descripcion: '',
    fechahora_creacion: '',
    id_expediente: 0,
  };
  observacionesLista: any[] = [];
  currentTab: string = 'ver';

  constructor(private observacionS: ObservacionesService) {}

  ngOnInit() {
    const now = new Date();
    this.observaciones.fechahora_creacion = now.toISOString().slice(0, 16).replace('T', ' ');

    if (this.expediente) {
      this.observaciones.id_expediente = this.expediente.id_expediente || this.expediente.id || 0;
    }
    this.cargarObservaciones();
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  cargarObservaciones() {
    if (this.observaciones.id_expediente) {
      this.observacionS.getObservaciones(this.observaciones.id_expediente).subscribe({
        next: (data) => {
          this.observacionesLista = data;
        },
        error: (err) => {
          console.error('Error al cargar observaciones:', err);
          this.mostrarModalError = true;
          this.mensajeError = 'Error al cargar las observaciones';
        },
      });
    }
  }

  close() {
    this.onClose.emit();
  }

  onSubmit() {
    if (!this.observaciones.descripcion.trim()) {
      this.errores = [
        {
          field: 'Observación',
          errors: ['La observación no puede estar vacía'],
        },
      ];
      this.mostrarModalError = true;
      return;
    }

    this.observacionS.createObservacion(this.observaciones).subscribe({
      next: () => {
        this.mostrarModalExito = true;
        this.cargarObservaciones();
        this.observaciones.descripcion = '';
      },
      error: (err) => {
        console.error('Error al registrar observación', err);
        this.errores = [
          {
            field: 'Error del sistema',
            errors: ['Ocurrió un error al registrar la observación'],
          },
        ];
        this.mostrarModalError = true;
      },
    });
  }

  cerrarModalError() {
    this.mostrarModalError = false;
    this.errores = [];
  }

  cerrarModalExito() {
    this.mostrarModalExito = false;
    this.setTab('ver');
  }
}

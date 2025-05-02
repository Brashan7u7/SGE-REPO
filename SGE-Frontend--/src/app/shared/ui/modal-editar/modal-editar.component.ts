import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpedientesService } from '../../../services/expedientes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalExitoComponent } from '../modal-exito/modal-exito.component';

@Component({
  selector: 'app-modal-editar',
  imports: [FormsModule, CommonModule, ModalExitoComponent],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.scss',
})
export class ModalEditarComponent {
  @Input() expediente: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();
  mostrarModalExito: boolean = false;

  expedienteEditado: any = {};

  constructor(private expedientesService: ExpedientesService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expediente']?.currentValue) {
      
      this.expedienteEditado = { ...changes['expediente'].currentValue };
      this.expedienteEditado.fecha_cierre = this.formatDate(this.expediente.fecha_cierre);
      this.expedienteEditado.fecha_apertura = this.formatDate(this.expediente.fecha_apertura);
    }
  }

  private formatDate(date: string): string {
    return date ? date.split('T')[0] : '';
  }

  guardarCambios() {
    const id = this.expedienteEditado.id_expediente;
    if (!id) {
      console.error('Error: ID del expediente no definido.');
      return;
    }
    this.expedientesService.updateExpediente(id, this.expedienteEditado).subscribe({
      next: (res) => {
       
        this.mostrarModalExito = true;
        this.onSave.emit(this.expedienteEditado);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al actualizar expediente:', error);
      },
    });
  }

  close() {
    this.onClose.emit();
  }
}

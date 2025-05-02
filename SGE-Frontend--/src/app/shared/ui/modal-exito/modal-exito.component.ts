import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-exito',
  imports: [],
  templateUrl: './modal-exito.component.html',
  styleUrl: './modal-exito.component.scss',
})
export class ModalExitoComponent {
  @Input() mensaje: string = 'Operación realizada correctamente';
  @Output() onClose = new EventEmitter<void>();

  cerrar() {
    this.onClose.emit();
  }
}

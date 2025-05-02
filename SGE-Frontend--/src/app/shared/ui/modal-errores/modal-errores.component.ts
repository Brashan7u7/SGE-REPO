import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-errores',
  imports: [CommonModule],
  templateUrl: './modal-errores.component.html',
  styleUrl: './modal-errores.component.scss'
})
export class ModalErroresComponent {
  @Input() errores: any[] = []; 

  constructor() {}
  
}

import { Component } from '@angular/core';
import { MovimientosService } from '../../services/movimientos.service';
import { AuthserviceService } from '../../auth/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  movimientos: any[] = [];
  id_usuario: number = 0;
  constructor(
    private movimientoService: MovimientosService,
    private authService: AuthserviceService,
  ) {}

  ngOnInit(): void {
    this.id_usuario = this.authService.getId() ?? 0;

    this.movimientoService.getMisMovimientos(this.id_usuario).subscribe((data) => {
      this.movimientos = data;
    });
  }
}

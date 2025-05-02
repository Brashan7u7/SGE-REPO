import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../../shared/components/search-form/search-form.component';
import { ModalEditarComponent } from '../../shared/ui/modal-editar/modal-editar.component';
import { ModalObservacionesComponent } from '../../shared/ui/modal-observaciones/modal-observaciones.component';
import { RouterLink } from '@angular/router';
import { ExpedientesService } from '../../services/expedientes.service';
import { ModalSolicitantesListComponent } from '../../shared/ui/modal-solicitantes-list/modal-solicitantes-list.component';

@Component({
  selector: 'app-expedientes-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchFormComponent,
    ModalEditarComponent,
    ModalObservacionesComponent,
    RouterLink,
    ModalSolicitantesListComponent,
  ],
  templateUrl: './expedientes-list.component.html',
  styleUrls: ['./expedientes-list.component.scss'],
})
export class ExpedientesListComponent implements OnInit {
  listExpedientes: any[] = [];
  filteredExpedientes: any[] = [];
  searchText: string = '';
  selectedOption: string = 'Todos';

  showModalEditar: any = null;
  showModalPrestamo: any = null;
  showModalBaja: any = null;
  showModalObservaciones: any = null;

  currentPage: number = 1;
  totalExpedientes: number = 0;
  lastPage: number = 1;
  limit: number = 10;
  maxPagesVisible: number = 10;

  constructor(private expedientesService: ExpedientesService) {}

  ngOnInit(): void {
    this.getExpedientes();
  }

  onFilterChange(filters: { searchText: string; selectedOption: string }) {
    this.searchText = filters.searchText;
    this.selectedOption = filters.selectedOption;
    this.currentPage = 1; // Restablecer la página cuando se cambian los filtros
    this.getExpedientes();
  }

  getExpedientes(): void {
    this.expedientesService
      .getExpedientes(this.currentPage, this.limit, this.selectedOption, this.searchText)
      .subscribe((response) => {
        this.listExpedientes = response.data;
        this.totalExpedientes = response.total;
        this.lastPage = response.lastPage;
      });
  }

  // Función para obtener las páginas visibles (máximo 10 páginas)
  getPaginatedPages(): number[] {
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesVisible / 2));
    let endPage = Math.min(this.lastPage, startPage + this.maxPagesVisible - 1);

    if (endPage - startPage < this.maxPagesVisible - 1) {
      startPage = Math.max(1, endPage - this.maxPagesVisible + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.lastPage) {
      this.currentPage = page;
      this.getExpedientes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.getExpedientes();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getExpedientes();
    }
  }

  openModal(type: 'editar' | 'baja' | 'observaciones' | 'prestamo', expediente: any) {
    if (type === 'editar') this.showModalEditar = expediente;
    if (type === 'baja') this.showModalBaja = expediente;
    if (type === 'observaciones') this.showModalObservaciones = expediente;

    if (type === 'prestamo') this.showModalPrestamo = expediente;
  }

  // Dentro de ExpedientesListComponent

  handleSave(expedienteActualizado: any): void {
    const index = this.listExpedientes.findIndex((exp) => exp.id_expediente === expedienteActualizado.id_expediente);
    if (index !== -1) {
      this.listExpedientes[index] = { ...expedienteActualizado };
    }
    this.closeModal('editar');
  }

  closeModal(type: 'editar' | 'baja' | 'observaciones' | 'prestamo') {
    if (type === 'editar') this.showModalEditar = null;
    if (type === 'baja') this.showModalBaja = null;
    if (type === 'observaciones') this.showModalObservaciones = null;
    if (type === 'prestamo') this.showModalPrestamo = null;
  }
}

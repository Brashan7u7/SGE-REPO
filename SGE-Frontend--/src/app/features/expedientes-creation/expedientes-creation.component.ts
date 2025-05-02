import { Component, HostListener } from '@angular/core';
import { ExpedientesService } from '../../services/expedientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalErroresComponent } from '../../shared/ui/modal-errores/modal-errores.component';
import { UmfsService } from '../../services/umfs.service';
import { Router } from '@angular/router';
import { ModalExitoComponent } from '../../shared/ui/modal-exito/modal-exito.component';

@Component({
  selector: 'app-expedientes-creation',
  imports: [CommonModule, FormsModule, ModalErroresComponent, ModalExitoComponent],
  templateUrl: './expedientes-creation.component.html',
  styleUrl: './expedientes-creation.component.scss',
})
export class ExpedientesCreationComponent {
  mostrarModalExito: boolean = false;
  expediente: any = {
    num_seg_social: '',
    agregado_medico: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    domicilio: '',
    curp: '',
    telefono: '',
    turno_adscripcion: '',
    fechahora_creacion: '',
    consultorio_adscripcion: '',
    umf_adscripcion: '',
    fecha_apertura: '',
    folio: '',
    vigencia_documental: '',
    fojas: 0,
    tipo_documento: '',

    delegacion: '',
    legajo: 0,
    nota_medica: '',
    sexo: '',
    super_expediente: false,
  };
  disableAllExcept = true;
  errores: any[] = [];
  filteredUmfs: any[] = [];
  filteredDelegaciones: string[] = [];

  constructor(
    private expedienteS: ExpedientesService,
    private umfService: UmfsService,
    private router: Router,
  ) {}

  selectDelegacion(delegacion: string) {
    this.expediente.delegacion = delegacion;
    this.filteredDelegaciones = [];

    // Llamar al servicio para buscar UMFs relacionadas con esta delegación
    this.umfService.searchUmfsByDelegation(delegacion).subscribe((umfs) => {
      this.filteredUmfs = umfs;
    });
  }

  selectUmf(umf: any) {
    this.expediente.umf_adscripcion = umf.unidad_medica;
    this.expediente.id_umf = umf.id_umf;
    this.filteredUmfs = [];
  }

  onDelegacionFocus() {
    this.umfService.searchDelegations().subscribe((delegaciones) => {
      this.filteredDelegaciones = delegaciones;
    });
  }

  // Método para reiniciar el filtro de UMFs cuando se selecciona una delegación
  onUmfFocus() {
    if (!this.expediente.delegacion) {
      alert('Selecciona una delegación primero.');
      return;
    }
  }

  onSubmit() {
    this.expediente.fechahora_creacion = new Date().toISOString();

    this.expediente.super_expediente = !!this.expediente.super_expediente;

    this.expedienteS.createExpediente(this.expediente).subscribe({
      next: (response) => {
        this.mostrarModalExito = true;
        this.router.navigate(['/list_files']);
      },
      error: (err) => {
        console.error('Error capturado:', err);
        if (err.status === 400 && err.error && Array.isArray(err.error.message)) {
          this.mostrarErrores(err.error.message);
        } else {
          alert('Ocurrió un error inesperado.');
        }
      },
    });
  }

  onInputChange(event: any) {
    const query = event.target.value;

    if (query.length >= 2) {
      this.umfService.search(query).subscribe((results) => {
        this.filteredUmfs = results;
      });
    } else {
      this.filteredUmfs = [];
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const delegacionInput = event.target as HTMLElement;
    const umfInput = event.target as HTMLElement;

    if (!delegacionInput.closest('#delegacion') && !delegacionInput.closest('.autocomplete-list')) {
      this.filteredDelegaciones = [];
    }

    if (!umfInput.closest('#umf-adscripcion') && !umfInput.closest('.autocomplete-list')) {
      this.filteredUmfs = [];
    }
  }

  mostrarErrores(errores: any[]) {
    this.errores = errores.map((error) => ({
      field: 'Campo no especificado',
      errors: [error],
    }));
  }
}

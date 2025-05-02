import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpedientesService } from '../../../services/expedientes.service';
import { AuthserviceService } from '../../../auth/authservice.service';
import { PrestamosService } from '../../../services/prestamos.service';
import { ModalExitoComponent } from '../modal-exito/modal-exito.component';
import { ModalErroresComponent } from '../modal-errores/modal-errores.component';

interface Prestamo {
  fecha_solicitud: string;
  fecha_prestamo: string | null;
  fecha_devolucion: string | null;
  datos_solicitante: string;
  observaciones: string;
  id_expediente: number;
  folio: number;
  nombre: string;
  matricula: number;
  categoria: string;
  serv_especialidad: string;
  consultorio: string;
  turno: string;
  telefono: string;
  correo: string;
  motivo: string;
}

@Component({
  selector: 'app-modal-solicitantes-list',
  imports: [CommonModule, FormsModule, ModalExitoComponent, ModalErroresComponent],
  templateUrl: './modal-solicitantes-list.component.html',
  styleUrl: './modal-solicitantes-list.component.scss',
})
export class ModalSolicitantesListComponent implements OnInit {
  id_prestamo: any;
  prestamo: Prestamo = {
    fecha_solicitud: '',
    fecha_prestamo: null,
    fecha_devolucion: null,
    datos_solicitante: '',
    observaciones: '',
    id_expediente: 0,
    folio: 0,
    nombre: '',
    matricula: 0,
    categoria: '',
    serv_especialidad: '',
    consultorio: '',
    turno: '',
    telefono: '',
    correo: '',
    motivo: '',
  };

  @Input() expediente: any;
  @Output() onClose = new EventEmitter<void>();

  currentTab: string = 'tab1';
  prestamos: any[] = [];
  role: string | null = null;
  errores: any[] = [];
  id_usuario: number | null = null;
  mostrarModalExito: boolean = false;
  mostrarModalError: boolean = false;
  mensajeExito: string = '';
  procesando: boolean = false;

  constructor(
    private expedienteS: ExpedientesService,
    private authService: AuthserviceService,
    private prestamoS: PrestamosService,
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.id_usuario = this.authService.getId();
    this.obtenerPrestamos(this.expediente.id_expediente);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expediente'] && this.expediente) {
    }
  }

  obtenerPrestamos(id: number): void {
    this.prestamoS.getPrestamos(id).subscribe({
      next: (data) => {
        this.prestamos = Array.isArray(data) ? data : [data];
        this.id_prestamo = this.prestamos[0]?.id_prestamo || null;
      },
      error: (err) => {
        console.error('Error al obtener préstamos:', err);
        this.mostrarError('Error al obtener los préstamos');
      },
    });
  }

  onSubmit() {
    this.procesando = true;
    this.prestamo.fecha_solicitud = new Date().toISOString();
    this.prestamo.id_expediente = this.expediente.id_expediente;

    this.prestamoS.createPrestamo(this.prestamo).subscribe({
      next: (response) => {
        this.mostrarExito('Préstamo creado correctamente');
        this.obtenerPrestamos(this.expediente.id_expediente);
        this.currentTab = 'tab1'; 
        this.resetForm();
      },
      error: (error) => {
        if (error.status === 400 && error.error && Array.isArray(error.error.message)) {
          this.errores = error.error.message.map((msg: string) => ({
            field: 'Error de validación',
            errors: [msg],
          }));
          this.mostrarModalError = true;
        } else {
          this.mostrarError('Error al crear el préstamo');
        }
        this.procesando = false;
      },
      complete: () => {
        this.procesando = false;
      },
    });
  }
  devolverPrestamo() {
    this.procesando = true;
    const updatePrestamoDto = {
      estado: 'Devuelto',
      fecha_devolucion: new Date().toISOString(),
    };

    this.prestamoS.ActualizarPrestamo(this.id_prestamo, updatePrestamoDto).subscribe({
      next: () => {
        this.mostrarExito('Préstamo devuelto correctamente');
        this.obtenerPrestamos(this.expediente.id_expediente);
      },
      error: () => {
        this.mostrarError('Error al devolver el préstamo');
        this.procesando = false;
      },
      complete: () => {
        this.procesando = false;
      },
    });
  }
  autorizarPrestamo() {
    this.procesando = true;
    const updatePrestamoDto = {
      estado: 'Aprobado',
      fecha_prestamo: new Date().toISOString(),
    };

    this.prestamoS.AutorizarPrestamo(this.id_prestamo, updatePrestamoDto).subscribe({
      next: () => {
        this.mostrarExito('Préstamo autorizado correctamente');
        this.obtenerPrestamos(this.expediente.id_expediente);
      },
      error: () => {
        this.mostrarError('Error al autorizar el préstamo');
        this.procesando = false;
      },
      complete: () => {
        this.procesando = false;
      },
    });
  }

  rechazarPrestamo() {
    this.procesando = true;
    const updatePrestamoDto = {
      estado: 'Rechazado',
    };

    this.prestamoS.ActualizarPrestamo(this.id_prestamo, updatePrestamoDto).subscribe({
      next: () => {
        this.mostrarExito('Préstamo rechazado correctamente');
        this.obtenerPrestamos(this.expediente.id_expediente);
      },
      error: () => {
        this.mostrarError('Error al rechazar el préstamo');
        this.procesando = false;
      },
      complete: () => {
        this.procesando = false;
      },
    });
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  resetForm() {
    this.prestamo = {
      fecha_solicitud: '',
      fecha_prestamo: null,
      fecha_devolucion: null,
      datos_solicitante: '',
      observaciones: '',
      id_expediente: this.expediente.id_expediente,
      folio: 0,
      nombre: '',
      matricula: 0,
      categoria: '',
      serv_especialidad: '',
      consultorio: '',
      turno: '',
      telefono: '',
      correo: '',
      motivo: '',
    };
  }
  mostrarExito(mensaje: string) {
    this.mensajeExito = mensaje;
    this.mostrarModalExito = true;
  }

  mostrarError(mensaje: string) {
    this.errores = [
      {
        field: 'Error',
        errors: [mensaje],
      },
    ];
    this.mostrarModalError = true;
  }

  cerrarModalExito() {
    this.mostrarModalExito = false;
  }

  cerrarModalError() {
    this.mostrarModalError = false;
  }

  close() {
    this.onClose.emit();
  }

  mostrarErrores(errores: any[]) {
    this.errores = errores.map((error) => ({
      field: 'Campo no especificado',
      errors: [error],
    }));
  }
}

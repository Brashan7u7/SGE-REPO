import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-creation',
  imports: [FormsModule],
  templateUrl: './usuarios-creation.component.html',
  styleUrl: './usuarios-creation.component.scss',
})
export class UsuariosCreationComponent {
  usuario = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    contrasena: '',
    esAdmin: false
  };
  constructor(private usuariosService: UsuariosService) {}

  onSubmit() {
    this.usuariosService.createUsuario(this.usuario).subscribe({
      next: (res) => {
        
        alert('Usuario creado exitosamente');
      },
      error: (err) => {
        
        alert('Ocurrió un error al crear el usuario');
      }
    });
  }
}
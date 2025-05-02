import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuarios-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.scss',
})
export class UsuariosListComponent {
  usuarios: any[] = [];
  editingUser: any = null; 

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        this.usuarios = response;
      },
      error: (err) => {
        console.error('Error obteniendo usuarios:', err);
      }
    });
  }

  eliminarUsuario(idUsuario: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(idUsuario).subscribe({
        next: (res) => {
          alert('Usuario eliminado correctamente');
          this.getUsuarios();
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          alert('Ocurrió un error al eliminar el usuario');
        }
      });
    }
  }

  iniciarEdicion(usuario: any) {
    this.editingUser = { ...usuario };
  }

  cancelarEdicion() {
    this.editingUser = null;
  }

  guardarEdicion() {
    if (this.editingUser) {
     
      const updates = {
        correo: this.editingUser.correo,
        telefono: this.editingUser.telefono,
        esAdmin: this.editingUser.esAdmin
      };
    
      this.usuariosService.updateUsuario(this.editingUser.id_usuario, updates).subscribe({
        next: (res) => {
          alert('Usuario actualizado correctamente');
          this.editingUser = null;
          this.getUsuarios();
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          alert('Ocurrió un error al actualizar el usuario');
        }
      });
    }
  }
}
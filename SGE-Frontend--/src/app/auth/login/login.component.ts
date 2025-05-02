import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthserviceService,
    private router: Router,
  ) {}


  userForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  OnSubmit() {
    if (this.userForm.valid) {
      const correo = this.userForm.get('correo')?.value ?? '';
      const contrasena = this.userForm.get('contrasena')?.value ?? '';

      
      this.authService.login(correo, contrasena).subscribe({
        next: (response) => {
          
          this.router.navigate(['/list_files']);
        },
        error: (err) => {
          console.error('Error en el login', err);
          window.alert('Usuario o contraseña incorrectos');
        }
      });
    }
    console.warn(this.userForm.value);
  }
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthserviceService } from '../../../auth/authservice.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  constructor(
    public authService: AuthserviceService,
    private router: Router,
  ) {}
  nombre: any;
  ngOnInit(): void {
    this.nombre = this.authService.getNombre();
    
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

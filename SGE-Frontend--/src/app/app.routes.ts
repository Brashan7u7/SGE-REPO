import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'files_view/:id_expediente',
    loadComponent: () =>
      import('./features/expedientes-view/expedientes-view.component').then((c) => c.ExpedientesViewComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'files_view',
    loadComponent: () =>
      import('./features/expedientes-view/expedientes-view.component').then((c) => c.ExpedientesViewComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'creation_files',
    loadComponent: () =>
      import('./features/expedientes-creation/expedientes-creation.component').then(
        (c) => c.ExpedientesCreationComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'list_files',
    loadComponent: () =>
      import('./features/expedientes-list/expedientes-list.component').then((c) => c.ExpedientesListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'creation_user',
    loadComponent: () =>
      import('./features/usuarios-creation/usuarios-creation.component').then((c) => c.UsuariosCreationComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'list_user',
    loadComponent: () =>
      import('./features/usuarios-list/usuarios-list.component').then((c) => c.UsuariosListComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/perfil/perfil.component').then((c) => c.PerfilComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

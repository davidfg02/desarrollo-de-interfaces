import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { rolGuard } from './guards/rol-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'inicio',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage),
  },
  {
    path: 'admin',
    canActivate: [authGuard, rolGuard],
    data: { rol: 'admin' },
    loadComponent: () => import('./pages/admin/admin.page').then(m => m.AdminPage),
  },
];
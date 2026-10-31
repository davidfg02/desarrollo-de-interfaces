import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Rol } from '../services/auth';

export const rolGuard: CanActivateFn = async (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.esperarListo();
  const rolRequerido = route.data['rol'] as Rol;
  return auth.tieneRol(rolRequerido) ? true : router.createUrlTree(['/inicio']);
};
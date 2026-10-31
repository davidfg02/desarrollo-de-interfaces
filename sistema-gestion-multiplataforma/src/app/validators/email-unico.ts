import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, from, map, of, switchMap, timer } from 'rxjs';
import { AuthService } from '../services/auth';

export function emailUnico(auth: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>
    timer(400).pipe(
      switchMap(() => from(auth.emailExiste(control.value))),
      map(existe => (existe ? { emailExiste: true } : null)),
      catchError(() => of(null)),
    );
}
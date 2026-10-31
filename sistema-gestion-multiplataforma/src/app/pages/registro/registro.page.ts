import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonButtons, IonMenuButton, IonText, IonCol, IonRow, IonGrid } from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { emailUnico } from '../../validators/email-unico';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  imports: [
    ReactiveFormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonButtons, IonMenuButton, IonText,
    IonCol,
    IonRow,
    IonGrid
],
})
export class RegistroPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], [emailUnico(this.auth)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

async registrar(): Promise<void> {
  console.log('registrar() ejecutado', this.form.valid);
  if (this.form.invalid) return;
  this.error = '';
  const { nombre, email, password } = this.form.getRawValue();
  try {
    await this.auth.registro(nombre, email, password);
    console.log('registro OK');
    this.router.navigateByUrl('/inicio');
  } catch (e) {
    console.error('Error en registro:', e);
    this.error = 'No se pudo completar el registro';
  }
}
}
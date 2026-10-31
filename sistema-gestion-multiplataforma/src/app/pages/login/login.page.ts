import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonButtons, IonMenuButton, IonText, IonRow, IonCol, IonGrid } from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [
    FormsModule, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonButtons, IonMenuButton, IonText,
    IonRow,
    IonCol,
    IonGrid
],
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  async entrar(): Promise<void> {
    this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl(this.auth.tieneRol('admin') ? '/admin' : '/inicio');
    } catch (e) {
      console.error('Error en login:', e);
      this.error = 'Correo o contraseña incorrectos';
    }
  }
}
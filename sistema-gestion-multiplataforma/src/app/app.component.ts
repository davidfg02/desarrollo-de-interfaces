import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle, IonSplitPane } from '@ionic/angular';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    AsyncPipe, RouterLink, IonApp, IonRouterOutlet, IonMenu, IonHeader,
    IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle,
    IonSplitPane
],
})
export class AppComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  async salir(): Promise<void> {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
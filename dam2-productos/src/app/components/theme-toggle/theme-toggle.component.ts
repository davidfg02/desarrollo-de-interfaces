import { Component, inject } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <ion-button (click)="theme.toggle()" aria-label="Cambiar tema">
      <ion-icon slot="icon-only" [name]="theme.dark() ? 'sunny' : 'moon'"></ion-icon>
    </ion-button>
  `,
  imports: [IonButton, IonIcon],
})
export class ThemeToggle {
  theme = inject(ThemeService);

  constructor() {
    addIcons({ moon, sunny });
  }
}
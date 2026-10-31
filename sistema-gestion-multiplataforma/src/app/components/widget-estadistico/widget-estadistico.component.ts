import { Component, input, output } from '@angular/core';
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
} from '@ionic/angular';

@Component({
  selector: 'app-widget-estadistico',
  templateUrl: './widget-estadistico.component.html',
  styleUrls: ['./widget-estadistico.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
})
export class WidgetEstadisticoComponent {
  // Props (entradas)
  titulo = input.required<string>();
  valor = input.required<number | string>();
  descripcion = input<string>('');

  // Eventos (salidas)
  pulsado = output<void>();
}
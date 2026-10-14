import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    DecimalPipe
  ]
})
export class NosotrosPage implements OnInit {
  private geolocationService = inject(GeolocationService);
  info = signal<{ latitud: number; longitud: number; distancia: number } | null>(null);

  async ngOnInit() {
    try {
      this.info.set(await this.geolocationService.getUbicacionYDistancia());
    } catch (error) {
      console.error('No se pudo obtener la ubicación', error);
    }
  }
}
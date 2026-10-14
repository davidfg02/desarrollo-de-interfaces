import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private readonly oficinaLat = 40.4452;
  private readonly oficinaLon = -3.6115;

  async getUbicacionYDistancia() {
    const { coords } = await Geolocation.getCurrentPosition();
    const distancia = this.calcularDistancia(
      coords.latitude,
      coords.longitude,
      this.oficinaLat,
      this.oficinaLon
    );
    return { latitud: coords.latitude, longitud: coords.longitude, distancia };
  }

  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
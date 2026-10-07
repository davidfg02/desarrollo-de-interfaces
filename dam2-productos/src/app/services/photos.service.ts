import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotosProduct } from '../models/photos-product';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  // El endpoint devuelve 5000 elementos, así que limitamos
  getPhotosProducts(limit = 30): Observable<PhotosProduct[]> {
    return this.http.get<PhotosProduct[]>(`${this.apiUrl}?_limit=${limit}`);
  }

  getPhotosByAlbum(albumId: number): Observable<PhotosProduct[]> {
    return this.http.get<PhotosProduct[]>(`${this.apiUrl}?albumId=${albumId}`);
  }
}
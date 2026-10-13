import { Component, OnInit, inject, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular';
import { finalize } from 'rxjs';
import { PhotosProduct } from '../../models/photos-product';
import { PhotosService } from '../../services/photos.service';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    ThemeToggle
  ]
})
export class CatalogoPage implements OnInit {
  private photosService = inject(PhotosService);

  readonly photos = signal<PhotosProduct[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.photosService.getPhotosProducts()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (data) => this.photos.set(data),
        error: (err) => {
          console.error(err);
          this.error.set('Error crítico al conectar con la API');
        }
      });
  }
}
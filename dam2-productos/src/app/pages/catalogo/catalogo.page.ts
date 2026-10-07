import { Component, OnInit, inject } from '@angular/core';
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
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    ThemeToggle
  ]
})
export class CatalogoPage implements OnInit {
  private photosService = inject(PhotosService);

  photos: PhotosProduct[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.photosService.getPhotosProducts()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.photos = data;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error crítico al conectar con la API';
        }
      });
  }
}
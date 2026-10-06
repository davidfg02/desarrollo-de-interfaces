import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { ProductService } from '../../services/product';
import { Product, ProductsResponse } from '../../models/product.model';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [
    CurrencyPipe,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonButton, IonSpinner,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, ThemeToggle
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  private content = viewChild(IonContent);

  readonly pageSize = 12;

  products = signal<Product[]>([]);
  total = signal(0);
  page = signal(1);
  loading = signal(false);
  error = signal('');

  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize)));

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    const skip = (this.page() - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.page()) return;
    this.page.set(page);
    this.loadProducts();
    this.content()?.scrollToTop(300);
  }
}
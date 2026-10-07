import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    ThemeToggle,
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  @ViewChild(IonContent) content?: IonContent;

  readonly pageSize = 12;

  products: Product[] = [];
  total = 0;
  page = 1;
  loading = false;
  error = '';

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    const skip = (this.page - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se han podido cargar los productos.';
        this.loading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.loadProducts();
    this.content?.scrollToTop(300);
  }
}
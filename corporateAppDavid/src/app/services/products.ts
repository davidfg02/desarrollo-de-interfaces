import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  async getProducts(): Promise<Product[]> {
    const response = await fetch('assets/data/products.json');
    const products = await response.json();
    return products;
  }
}

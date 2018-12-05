import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Model
import { Product } from './product.model';

const MAX_PRODUCTS = 6;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public products: Product[] = [];
  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts(): void {
    if (!this.productsReady.getValue()) {
      for (let i = 1; i <= MAX_PRODUCTS; i++) {
        this.http.get<Product>(`../assets/descritpion/${i}.json`)
          .subscribe((product) => {
            this.products.push(product);
          });
        if (i === MAX_PRODUCTS) {
            this.productsReady.next(true);
        }
      }
    } else {
      return;
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Model
import { Product } from './product.model';

const MAX_PRODUCTS = 3;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public products: Product[] = new Array(MAX_PRODUCTS);
  constructor(private http: HttpClient) { }

  loadProducts(): void {
    if (!this.productsReady.getValue()) {
      for (let i = 1; i <= MAX_PRODUCTS; i++) {
        this.http.get<Product>(`../../assets/descritpion/${i}.json`)
          .subscribe((product) => {
            this.products[i - 1] = product;
          });

        if (i = MAX_PRODUCTS) {
            this.productsReady.next(true);
        }
      }
    } else {
      return;
    }
  }

}

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
  private x = 0;
  public products: Product[] = new Array(MAX_PRODUCTS);
  constructor(private http: HttpClient) { }

  loadProducts(): void {

    // this.productsReady.next(true);

    for (let i = 0; i < MAX_PRODUCTS; i++) {
        this.http.get<Product>(`../../assets/descritpion/${i + 1}.json`)
          .subscribe((product) => {
            this.products[i] = product;
          });

        if (this.x = MAX_PRODUCTS) {
            this.productsReady.next(true);
        }
    }
  }

}

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
  /*
  private BehaviourSubject<boolean> productsReady = new BehaviourSubject(false);
  public
  constructor(private http: HttpClient) { }



  loadProducts(): void {

    productsReady.next(true);

    let x = 0;

    for ( let i = 0; i < MAX_PRODUCTS; i++ ) {
        this.http.get<Product>(`../../assets/descritpion/${i}.json`);
        jsonsubsribe() {
            x++;
        }
        if(x = MAX_PRODUCTS) {
            this.productsReady.next(true)
        }
    }
  }
  */
}

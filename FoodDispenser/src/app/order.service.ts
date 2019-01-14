import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Models
import { Order } from './order.model';
import { Product } from './product.model';
// RXJS
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:3000/api/order';
  public orders: Order[];

  constructor(private http: HttpClient) { }


  // TODO: Change Return Type could be an Observable
  sendOrder(order: any): Observable<any> {
    console.log('Send order to host');
      const options = {headers: {'Content-Type': 'application/json'}};
      return this.http.post<{productID: number, amount: number, rotation: number}>(this.orderUrl, JSON.stringify(order), options);
  }


  getProduct(productID: number): Observable<Product> {
    return this.http.get<Product>(`../../assets/descritpion/${productID}.json`);
  }

  getOrders(): Observable<any> {
    return this.http
    .get<any>(this.orderUrl)
    .pipe(map((orderData) => {
        return orderData.posts.map(post => {
          return {
            id: post._id,
            productID: post.productID,
            amount: post.amount,
            time: new Date(post.time)
          };
        });
    }));
  }

  getProductOrders(productID: number) {
    console.log('ProductID Service: ' + productID);
    console.log('ProductUrl: ' + this.orderUrl + '/' + productID);
    return this.http
    .get<any>(this.orderUrl + '/' + productID)
    .pipe(map((orderData) => {
      return orderData.posts.map(post => {
        return {
          id: post._id,
          productID: post.productID,
          amount: post.amount,
          time: new Date(post.time)
        };
      });
    }));

  }

  deleteOrder(orderID: string) {
    this.http.delete(this.orderUrl + '/' + orderID)
      .subscribe(() => {
        console.log(` ${this.orderUrl + '/' + orderID} Deleted!`);
      });
  }


  private log(message: string) {
    // Code here
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}
}

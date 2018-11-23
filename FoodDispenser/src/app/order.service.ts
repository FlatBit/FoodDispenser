import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from './order.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const x = {
  sdf: 4,
  zahl: 'string'
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:3000/api/order';

  constructor(private http: HttpClient) { }


  // TODO: Change Return Type
  sendOrder(order: any) {
    console.log('Send order to host');
    this.http.post<{ message: string }>(this.orderUrl, order, httpOptions)
      .subscribe((message) => {
        console.log(message.message);
      });
  }

  getOrders(): Order[] {
    return this.http.get<order: Order[]>(this.orderUrl).pipe(
      tap(_ => this.log('fetched orders')),
      catchError(this.handleError('getOrders', []))
    );
  }

  etPosts(){
    this.http
      .get<{ message: string; posts: Post[] }>(
        "route"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next(p...this.posts]);
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

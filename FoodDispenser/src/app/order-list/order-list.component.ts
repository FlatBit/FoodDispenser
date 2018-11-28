import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { OrderService } from './../order.service';
// Models
import { Order } from './../order.model';
import { Product } from './../product.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders: Order[];
  public orderObservable: Observable<Order[]>;
  public productObservable: Observable<Product>;
  public productName: String;


  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    // TODO: Set Observable async
    this.orderObservable = this.orderService.getOrders();
    this.orderObservable.subscribe(orders => {
      this.orders = orders;
    });
  }

  deleteOrder(id: string) {
    this.orderService.deleteOrder(id);
    const element = this.orders.find(orderElement => orderElement.id === id);
      console.log(element);
      const index = this.orders.indexOf(element, 0);
        if (index > -1) {
          this.orders.splice(index, 1);
        }
  }

  loadProduct(id: number): Observable<Product> {
    return this.orderService.getProduct(id);
  }



}

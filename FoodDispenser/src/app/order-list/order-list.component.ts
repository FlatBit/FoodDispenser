import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
// Service
import { OrderService } from './../order.service';
import { ProductService } from './../product.service';

// Models
import { Order } from './../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders: Order[];
  public orderObservable: Observable<Order[]>;
  public productName: String;


  constructor(private orderService: OrderService,
              public productService: ProductService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    // TODO: Set Observable async
    this.orderObservable = this.orderService.getOrders();
    this.orderObservable.subscribe(orders => {
      this.orders = orders;
    });
    this.productService.loadProducts();
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

}

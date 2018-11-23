import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { OrderService } from './../order.service';
import { Order } from './../order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders: Order[];

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private location: Location,
              private http: HttpClient) { }

  ngOnInit() {
    // TODO: Call getOrders
    this.orderService.getOrders()
      .subscribe();
  }


}
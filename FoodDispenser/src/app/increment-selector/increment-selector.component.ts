import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './../order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../product.model';



@Component({
  selector: 'app-increment-selector',
  templateUrl: './increment-selector.component.html',
  styleUrls: ['./increment-selector.component.css']
})
export class IncrementSelectorComponent implements OnInit {

  public amount = 0;
  private id = 0;
  public product: Product;
  private incrementBy = 15;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // log the entire params object
      console.log(params);
      // set ProductID to URL ID
      this.id = params['id'];
    });
   this.loadProduct();
  }

  loadProduct(): void {
    // this.product.productID = +this.route.snapshot.paramMap.get('id');
    this.getProduct(this.id);
  }

  getProduct(productID: number): void {
    this.http.get(`../../assets/descritpion/${productID}.json`)
      .subscribe( product => {
        this.product = product as Product;
        console.log(this.product);
      });
  }


  // Event Handlers

  clickHandlerMinus() {
    if (this.amount >= this.incrementBy) {
      this.amount -= this.incrementBy;
    }
  }

  clickHandlerPlus() {
    this.amount += this.incrementBy;
  }

  sendOrder(): void {
    this.orderService.sendOrder({});
  }

  goBack(): void {
    this.location.back();
  }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './../order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, observable } from 'rxjs';
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
  public productObservable: Observable<Product>;
  private incrementBy = 15;
  public infoText = '';

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


  // TODO: Move this Functions to a service
  loadProduct(): void {
    // this.product.productID = +this.route.snapshot.paramMap.get('id');
    this.getProduct(this.id);
  }

  getProduct(productID: number): void {
    this.productObservable = this.http.get<Product>(`../../assets/descritpion/${productID}.json`);
    this.productObservable.subscribe( product => {
      this.product = product;
      this.incrementBy = this.product.amount;
      this.infoText = `How much ${this.product.name} do you want?`;
      console.log(this.incrementBy);
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
    this.amount += +this.incrementBy;
    console.log(this.amount);
  }

  sendOrder(): void {
    this.orderService.sendOrder({productID: this.product.productID, amount: this.amount});
  }

  goBack(): void {
    this.location.back();
  }


}

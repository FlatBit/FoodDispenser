import { Component, OnInit } from '@angular/core';
import { OrderService } from './../order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Models
import { Product } from '../product.model';
// RXJS
import { Observable, observable } from 'rxjs';


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
    private location: Location
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
    this.productObservable = this.orderService.getProduct(this.id);
    this.productObservable.subscribe( product => {
      this.product = product;
      console.log('Product Name: ' + product.name);
      console.log('Product ID: ' + product.productID);
      console.log('Product Amount: ' + product.incrementAmount);
      this.incrementBy = +this.product.incrementAmount;
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

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
  public calcPrice: number;
  public productObservable: Observable<Product>;
  private incrementBy = 0;

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
    });
  }



  // Event Handlers
  clickHandlerMinus() {
    if (this.amount >= this.product.incrementAmount) {
      this.amount -= this.product.incrementAmount;
      this.calculatePrice();
    }
  }

  clickHandlerPlus() {
    this.amount += +this.product.incrementAmount;
    this.calculatePrice();
  }

  sendOrder(): void {
    this.orderService.sendOrder({productID: this.product.productID, amount: this.amount});
  }

  goBack(): void {
    this.location.back();
  }

  calculatePrice(): void {
    this.calcPrice = (+this.product.price / 100 ) * this.amount;
  }

}

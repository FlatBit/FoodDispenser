import { Component, OnInit } from '@angular/core';
import { OrderService } from './../order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// Models
import { Product } from '../product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// RXJS
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-increment-selector',
  templateUrl: './increment-selector.component.html',
  styleUrls: ['./increment-selector.component.css']
})
export class IncrementSelectorComponent implements OnInit {

  private rotation = 0;
  private id = 0;
  public amount = 0;
  public product: Product;
  public calcPrice = '0';
  public productObservable: Observable<Product>;

  private incrementBy = 0;
  public minusDisabled = true;

  constructor(
    private orderService: OrderService,
    private modelService: NgbModal,
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
      this.rotation--;
      this.calculatePrice();
    }
    if (this.amount === 0) {
      this.minusDisabled = true;
    }
  }

  clickHandlerPlus() {
    this.amount += +this.product.incrementAmount;
    this.rotation++;
    this.calculatePrice();
    if (this.minusDisabled) {
      this.minusDisabled = false;
    }
  }

  sendOrder(content: any): void {
    this.modelService.open(content, { centered: true});
    this.orderService.sendOrder({productID: this.product.productID, amount: this.amount, rotation: this.rotation})
      .pipe(delay(4000))
      .subscribe((data) => {
        this.modelService.dismissAll();
        this.location.back();
      });
  }

  goBack(): void {
    this.location.back();
  }

  calculatePrice(): void {
    this.calcPrice = ((+this.product.price / 100 ) * this.amount).toFixed(2);
  }

  isDisabled(): boolean {
    return this.minusDisabled;
  }

}

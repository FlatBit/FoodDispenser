import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { Observable, observable } from 'rxjs';
import { OrderService } from './../order.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  @Input() public id;
  public productObservable: Observable<Product>;

  public name = "--";
  public price = "--";
  public ammount = 0;
  public backGround;;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productObservable = this.orderService.getProduct(this.id);
    this.productObservable.subscribe( product => {
      this.name = product.name;
      this.price = product.price;
      this.ammount = product.incrementAmount;
      this.backGround = "url('../../assets/img/" + product.productID + ".jpg')";
    });
  }

}

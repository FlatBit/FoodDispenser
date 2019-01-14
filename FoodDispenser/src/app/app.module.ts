import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IncrementSelectorComponent } from './increment-selector/increment-selector.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { OrderListComponent } from './order-list/order-list.component';
import { SingleItemComponent } from './single-item/single-item.component';



@NgModule({
  declarations: [
    AppComponent,
    IncrementSelectorComponent,
    ItemSelectorComponent,
    OrderListComponent,
    SingleItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

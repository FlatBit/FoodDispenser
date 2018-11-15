import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IncrementSelectorComponent } from './increment-selector/increment-selector.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { OrderSelectorComponent } from './order-selector/order-selector.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    IncrementSelectorComponent,
    ItemSelectorComponent,
    OrderSelectorComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

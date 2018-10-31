import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IncrementSelectorComponent } from './increment-selector/increment-selector.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    IncrementSelectorComponent,
    ItemSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

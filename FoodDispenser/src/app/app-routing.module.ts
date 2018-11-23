import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncrementSelectorComponent } from './increment-selector/increment-selector.component';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { OrderListComponent } from './order-list/order-list.component';


const routes: Routes = [
  { path: '', component: ItemSelectorComponent},
  { path: 'incrementselector/:id', component: IncrementSelectorComponent },
  { path: 'orders', component: OrderListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

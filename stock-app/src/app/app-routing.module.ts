import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyStockComponent } from './stocks/buy-stock.component';

const routes: Routes = [
  {
    path: '',
    component: BuyStockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

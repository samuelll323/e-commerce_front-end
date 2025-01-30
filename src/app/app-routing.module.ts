import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from "./components/product/product.component";
import { OrderComponent } from "./components/order/order.component";
import { UserComponent } from "./components/user/user.component";
import {HomeComponent} from "./components/home/home.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'app/:id', component: AppComponent, children:[
      { path: 'profile', component: UserComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'products', component: ProductComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

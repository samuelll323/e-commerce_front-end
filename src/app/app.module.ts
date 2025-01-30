import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from "./components/user/user.component";
import { ProductComponent } from "./components/product/product.component";
import { OrderComponent } from "./components/order/order.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { OrderService } from "./services/order.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./components/home/home.component";
import {UserService} from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProductComponent,
    OrderComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

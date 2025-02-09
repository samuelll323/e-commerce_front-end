import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl = 'http://localhost:8080/api/users';

  private orderItems: OrderItem[] = [];

  constructor(private http: HttpClient) {
  }

  getOrderItems(): OrderItem[] {
    return this.orderItems;
  }

  addToOrder(product: Product) {
    const existingItem = this.orderItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.orderItems.push({ product, quantity: 1 });
    }
  }

  updateQuantity(productId: number, quantity: number) {
    this.orderItems = this.orderItems
      .map(item => item.product.id == productId ? { ...item, quantity } : item)
      .filter(item => item.quantity > 0);
  }

  removeFromOrder(productId: number) {
    this.orderItems = this.orderItems.filter(item => item.product.id !== productId);
  }

  cancelOrder() {
    this.orderItems = [];
  }

  placeOrder(userId: number): Observable<any> {
    const orderPayload = {
      productIds: this.orderItems.reduce((acc, item) => {
        for (let i = 0; i < item.quantity; i++) {
          acc.push(item.product.id);
        }
        return acc;
      }, [] as number[]),

      items: this.orderItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    console.log("Sending order payload:", orderPayload);

    return this.http.post(`${this.apiUrl}/${userId}/orders`, orderPayload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError("An error occurred while processing the order");
  }
}

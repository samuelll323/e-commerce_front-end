import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private cartItems: OrderItem[] = [];
  private cartSubject = new BehaviorSubject<OrderItem[]>(this.cartItems);

  constructor() {
  }

  getCart(): Observable<OrderItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: OrderItem): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1});
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(p => p.id !== productId);
    this.cartSubject.next(this.cartItems);
  }

  placeOrder(userId: number): void {
    if (this.cartItems.length === 0) {
      alert("Unable to place an empty order");
      return;
    }
    console.log('Order has been placed', this.cartItems);
    alert('Order has been placed');
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}

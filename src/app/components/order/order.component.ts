import {Component} from "@angular/core";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent {
  orderItems: OrderItem[] = [
    { id: 1, name: 'product1', price: 799, quantity: 1 },
    { id: 2, name: 'product2', price: 1999, quantity: 2 }
  ];

  increaseQuantity(item: OrderItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: OrderItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: OrderItem): void {
    this.orderItems = this.orderItems.filter(i => i.id !== item.id);
  }

  getTotalPrice(): number {
    return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder(): void {
    if (this.orderItems.length === 0) {
      alert('The order is empty.')
      return;
    }
    alert('Order has been placed');
    this.orderItems = [];
  }

  cancelOrder(): void {
    this.orderItems = [];
  }
}

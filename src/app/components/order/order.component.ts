import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService, OrderItem } from "../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderItems: OrderItem[] = [];
  userId!: number;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get("id");
      if (idParam) {
        this.userId = Number(idParam);
        if (isNaN(this.userId)) {
          return;
        }
      } else {
        return;
      }
      this.loadOrderItems();
    });
  }

  loadOrderItems() {
    this.orderItems = this.orderService.getOrderItems();
  }

  increaseQuantity(item: OrderItem) {
    this.orderService.updateQuantity(item.product.id, item.quantity + 1);
    this.loadOrderItems();
  }

  decreaseQuantity(item: OrderItem) {
    this.orderService.updateQuantity(item.product.id, item.quantity - 1);
    this.loadOrderItems();
  }

  removeItem(item: OrderItem) {
    this.orderService.removeFromOrder(item.product.id);
    this.loadOrderItems();
  }

  getTotalPrice() {
    return this.orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  placeOrder() {
    if (!this.userId) {
      alert("User ID not found");
      return;
    }

    console.log("Order items before placing order:", this.orderItems);

    this.orderService.placeOrder(this.userId).subscribe(() => {
      alert("Order placed successfully");
      this.orderService.cancelOrder();
      this.loadOrderItems();
    });
  }

  cancelOrder() {
    this.orderService.cancelOrder();
    this.loadOrderItems();
  }
}

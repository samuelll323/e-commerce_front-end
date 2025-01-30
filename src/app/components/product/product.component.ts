import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {OrderService} from "../../services/order.service";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity?: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    console.log('✅ ProductComponent Loaded'); // 🔍 确保组件被加载

    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        console.log('✅ Products Loaded:', this.products); // 🔍 确保 API 数据被正确获取
      },
      error => {
        console.error('❌ Error fetching products:', error);
      }
    );
  }

  addToOrder(product: Product): void {
    this.orderService.addToCart({id: product.id, name: product.name, price: product.price, quantity: 1});
  }
}

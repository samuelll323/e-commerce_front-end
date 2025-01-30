import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import {OrderComponent} from "../order/order.component";

interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  orders: Order[];
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{
  user: User = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    orders: [],
  };
  userId: string = '';

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.userId = params.get("id") || "";
      console.log("Obtained userId:", this.userId);

      if (!this.userId.trim()) {
        console.error("userId is empty, unable to send request！");
        return;
      }

      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
          console.log("User data:", data);
        },
        (error) => {
          console.error("Failed to load user profile:", error);
          alert('Loading user profile failed');
        }
      );
    });
  }

  updateUser() {
    console.log('User profile has been updated', this.user);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userId: string = '';

  constructor(private router: Router, private userService: UserService) {
  }

  enterApp(): void {
    if (!this.userId.trim()) {
      alert('Please input user id');
      return;
    }
    this.userService.getUserById(this.userId).subscribe(
      user => {
        this.router.navigate(['/app', this.userId]);
      },
      error => {
        alert('User not existed');
      }
    );
  }
}

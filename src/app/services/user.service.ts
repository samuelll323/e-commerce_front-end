import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  orders: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://3.128.29.165:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError("User not exist");
  }
}

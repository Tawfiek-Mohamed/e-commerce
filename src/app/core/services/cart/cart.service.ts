import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../constants/WEBSITE_BASE_URL';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemNumber = new BehaviorSubject(0);
  header: any = {
    token: localStorage.getItem('userToken'),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCart().subscribe({
      next: (res) => {
        this.cartItemNumber.next(res.numOfCartItems);
      },
    });
  }

  //create
  addTOCart(id: string): Observable<any> {
    return this.http.post(
      `${BASE_URL}api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: this.header,
      }
    );
  }

  //retrieve
  getCart(): Observable<any> {
    return this.http.get(`${BASE_URL}api/v1/cart`, {
      headers: this.header,
    });
  }

  //delete
  removeProductCart(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}api/v1/cart/${id}`,

      {
        headers: this.header,
      }
    );
  }

  //clear
  clearCart(): Observable<any> {
    return this.http.delete(`${BASE_URL}api/v1/cart`, {
      headers: {
        token: localStorage.getItem('userToken')!,
      },
    });
  }

  //update
  updateCart(id: string, count: number): Observable<any> {
    return this.http.put(
      `${BASE_URL}api/v1/cart/${id}`,
      {
        count: count,
      },

      {
        headers: this.header,
      }
    );
  }
}

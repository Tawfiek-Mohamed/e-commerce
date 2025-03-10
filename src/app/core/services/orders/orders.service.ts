import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants/WEBSITE_BASE_URL';
import { isPlatformBrowser } from '@angular/common';
import { iALLOrders } from '../../../shared/interface/orders/iAllOrders';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  header: any = {
    token: localStorage.getItem('userToken'),
  };
  constructor(private http: HttpClient) {
    // if (isPlatformBrowser(Id)) {
    //   this.token = { token: localStorage.getItem('userToken') || '' };
    // }
  }

  getAllOrders(id: string) {
    return this.http.get(`${BASE_URL}api/v1/orders/user/${id}`);
  }

  onlinePayment(cartId: string, userDetails: {}) {
    return this.http.post<any>(
      `${BASE_URL}api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: userDetails,
      },
      {
        headers: this.header,
      }
    );
  }

  cashPayment(cartId: string, userDetails: {}) {
    return this.http.post<any>(
      `${BASE_URL}api/v1/orders/${cartId}`,
      {
        shippingAddress: userDetails,
      },
      {
        headers: this.header,
      }
    );
  }
}

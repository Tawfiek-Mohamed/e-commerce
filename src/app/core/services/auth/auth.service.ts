import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth/auth';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './../../../../../node_modules/jwt-decode/build/cjs/index.d';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);
  //
  // behaviorSubject -> subscribe
  // next
  //getValue
  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) Id: object,
    private _router: Router
  ) {
    if (isPlatformBrowser(Id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.decodeUserData();
      }
    }
  }

  register(formData: Auth): Observable<any> {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      formData
    );
  }

  login(formData: Auth) {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      formData
    );
  }

  decodeUserData() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log(this.userData);
    // localStorage.setItem('userId', (jwtDecode(token) as { id: string }).id);
  }

  logOut() {
    // remove token from local storage
    // user data = null
    // navigate to login page
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
}

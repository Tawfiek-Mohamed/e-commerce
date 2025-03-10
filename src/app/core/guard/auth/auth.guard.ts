import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { routes } from './../../../app.routes';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService);
  let router = inject(Router);
  if (_Auth.userData.getValue() !== null) {
    return true;
  }
  router.navigate(['/login']);
  return false;

  // const router = inject(Router);
  // const _PLATFORM_ID = inject(PLATFORM_ID);
  // if (isPlatformBrowser(_PLATFORM_ID)) {
  //   const token = localStorage.getItem('userToken')!;
  //   console.log((jwtDecode(token) as { id: string }).id);
  //   if (token) {
  //     return true;
  //   } else {
  //     router.navigate(['/']);
  //     return false;
  //   }
  // }
  // return false;
};

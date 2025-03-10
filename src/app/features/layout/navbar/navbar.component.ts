import { Component, Input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  cartNumber: any;
  constructor(
    public _AuthService: AuthService,
    private flowbiteService: FlowbiteService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.cart.cartItemNumber.subscribe({
      next: (res) => {
        this.cartNumber = res;
      },
    });
    this._AuthService?.userData.subscribe({
      next: (res) => {
        if (res !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });

    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

  isLogin: boolean = false;
}

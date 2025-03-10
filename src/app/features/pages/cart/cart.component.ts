import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import {
  productsCart,
  Product,
} from '../../../shared/interface/productsCart/products-cart';
import { LoadingDataComponent } from '../../../shared/components/loading-data/loading-data.component';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [LoadingDataComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  isLoading: boolean = true;
  cartItems!: productsCart;
  productList: Product[] = [];
  constructor(private cart: CartService, private tostar: ToastrService) {}

  ngOnInit(): void {
    this.getCartProduct();
  }

  getCartProduct() {
    this.cart.getCart().subscribe({
      next: (res) => {
        console.log(res);

        this.cart.cartItemNumber.next(res.numOfCartItems);
        this.cartItems = res.data;
        this.productList = res.data.products;
        this.isLoading = false;
      },
    });
  }

  updateCartProduct(id: string, count: number) {
    if (count == 0) {
      this.removeProduct(id);
    }
    this.cart.updateCart(id, count).subscribe({
      next: (res) => {
        this.cart.cartItemNumber.next(res.numOfCartItems);
        this.cartItems = res.data;
        this.productList = res.data.products;
      },
    });
  }

  removeProduct(id: string) {
    this.cart.removeProductCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cart.cartItemNumber.next(res.numOfCartItems);
        this.cartItems = res.data;
        this.productList = res.data.products;
      },
    });
  }

  clearCartClick() {
    this.cart.clearCart().subscribe({
      next: (res: { message: string }) => {
        this.tostar.show('Card Cleared Successfully');
        this.productList = [];
      },
    });
  }
}

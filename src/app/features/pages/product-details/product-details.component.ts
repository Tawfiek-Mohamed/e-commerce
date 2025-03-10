import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/Products';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  id: any;
  productDetails!: Products;
  isLoading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductsService,
    private cart: CartService,
    private toster: ToastrService
  ) {
    activatedRoute.params.subscribe((res) => {
      // console.log(res['id']);
      this.id = res['id'];
    });
  }

  ngOnInit(): void {
    this.getSpecificProduct();
  }

  getSpecificProduct() {
    this.product.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        // console.log(res);
        this.isLoading = false;
        this.productDetails = res.data;
      },
    });
  }

  addToCart(id: string): void {
    this.cart.addTOCart(id).subscribe({
      next: (res) => {
        this.cart.cartItemNumber.next(res.numOfCartItems);
        this.toster.success(res.message, '', {
          progressBar: true,
          progressAnimation: 'decreasing',
          timeOut: 2000,
        });
      },
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { LoadingDataComponent } from '../../../shared/components/loading-data/loading-data.component';
import { CurrencyPipe } from '@angular/common';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { Products } from '../../../shared/interface/products/Products';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CategorySliderComponent } from "../categorySlider/category-slider/category-slider.component";

@Component({
  selector: 'app-home',
  imports: [
    LoadingDataComponent,
    CurrencyPipe,
    FormsModule,
    FilterPipe,
    RouterLink,
    CategorySliderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  searchValue: string = '';
  isLoading: boolean = false;

  productList: Products[] = [];

  constructor(
    private product: ProductsService,
    private cart: CartService,
    private toster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.isLoading = true;
    this.product.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.isLoading = false;
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

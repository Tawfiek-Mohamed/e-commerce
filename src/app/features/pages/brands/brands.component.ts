import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Brands } from '../../../shared/interface/Brands/Brands';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { LoadingDataComponent } from '../../../shared/components/loading-data/loading-data.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [FormsModule, LoadingDataComponent, CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandList: Brands[] = [];

  isLoading: boolean = true;
  selectedBrand: any = null; // Stores the selected brand
  constructor(
    private prod: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.prod.getALLBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandList = res.data;
        this.isLoading = false;
      },
    });
  }

  getCardData(brand: any) {
    this.selectedBrand = brand; // Update modal data
  }

  closeModal() {
    this.selectedBrand = null; // Hide modal
  }
}

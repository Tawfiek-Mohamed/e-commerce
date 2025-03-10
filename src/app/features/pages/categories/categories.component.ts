import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Categories } from '../../../shared/interface/Categories/Categories';
import { ActivatedRoute } from '@angular/router';
import { LoadingDataComponent } from '../../../shared/components/loading-data/loading-data.component';

@Component({
  selector: 'app-categories',
  imports: [LoadingDataComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categoryList: Categories[] = [];
  isLoading: boolean = true;
  constructor(
    private prod: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.prod.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoryList = res.data;
        this.isLoading = false;
      },
    });
  }
}

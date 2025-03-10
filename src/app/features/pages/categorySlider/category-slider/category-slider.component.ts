import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../core/services/category/category-slider.service';
import { Categories } from '../../../../shared/interface/Categories/Categories';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule,NgFor],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{
  categoryList:Categories[] = [];
  constructor(private cate:CategoryService){}

  ngOnInit(){
    this.getAllCategories();
  }
  getAllCategories(){
    this.cate.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
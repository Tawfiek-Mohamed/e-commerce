import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../../shared/interface/products/Products';
import { BASE_URL } from '../../constants/WEBSITE_BASE_URL';
import { Brands } from '../../../shared/interface/Brands/Brands';
import { Categories } from '../../../shared/interface/Categories/Categories';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Products> {
    return this.http.get<Products>(`${BASE_URL}api/v1/products`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.http.get<Products>(`${BASE_URL}api/v1/products/${id}`);
  }

  getALLBrands(): Observable<Brands> {
    return this.http.get<Brands>(`${BASE_URL}api/v1/brands`);
  }

  getAllCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${BASE_URL}api/v1/categories`);
  }

  //
  // getAllPosts(): Observable<any> {
  //   return this.http.get(`https://jsonplaceholder.typicode.com/posts`);
  // }
  // getAllUsers(): Observable<any> {
  //   return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  // }
  //
}

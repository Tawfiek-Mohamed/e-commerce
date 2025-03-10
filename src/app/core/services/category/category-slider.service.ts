import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './../../constants/WEBSITE_BASE_URL';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<any>{
    return this.http.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
}
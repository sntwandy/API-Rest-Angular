import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { API_URL } from 'src/app/constant';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(API_URL);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${API_URL}/${id}`);
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(API_URL, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${API_URL}/${id}`, dto);
  }
}

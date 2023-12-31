import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { API_URL_PRODUCTS } from 'src/app/constant';
import { throwError } from 'rxjs';

import { checkTime } from 'src/app/interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(API_URL_PRODUCTS, { params, context: checkTime() }).pipe(
      retry(2),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: 0.19 * item.price,
          };
        })
      )
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${API_URL_PRODUCTS}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Something is wrong on the server');
        }

        if (error.status === HttpStatusCode.NotFound) {
          return throwError('The item doesnt exist');
        }

        return throwError('Uppsss there are something wrong :(');
      })
    );
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(API_URL_PRODUCTS, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${API_URL_PRODUCTS}/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${API_URL_PRODUCTS}/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { switchMap } from 'rxjs/operators';

import { PRODUCT_INITIAL_STATE } from 'src/app/constant';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChoosen: Product = PRODUCT_INITIAL_STATE;
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowProductDetail(id: string) {
    this.productsService.getProduct(id).subscribe((data) => {
      this.statusDetail = 'loading';
      this.productChoosen = data;
      this.toggleProductDetail();
      this.statusDetail = 'success';
    }, errorMessage => {
      window.alert(errorMessage);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(product.id, { title: 'New title' }))
      )
      .subscribe(data => console.log(data));
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New Product',
      description: 'Lorem ipsum',
      price: 34.5,
      categoryId: 2,
      images: ['']
    };
    this.productsService.create(product)
      .subscribe(data => this.products.unshift(data));
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Updated title'
    };
    this.productsService.update(this.productChoosen.id, changes)
      .subscribe(data => {
        const productIndex = this.products.findIndex(item => item.id === this.productChoosen.id);
        this.products[productIndex] = data;
        this.productChoosen = data;
      });
  }

  deleteProduct() {
    const ID = this.productChoosen.id;
    this.productsService.delete(ID)
      .subscribe(data => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChoosen.id
        );
        this.products.splice(productIndex, 1);
        this.toggleProductDetail();
      })
  }

  loadProducts(limit?: number, offset?: number)  {
    this.productsService
      .getProducts(limit, offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

  loadMore() {
    this.loadProducts(this.limit, this.offset);
  }
}

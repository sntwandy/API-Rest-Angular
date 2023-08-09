import { Component, OnInit } from '@angular/core';

import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

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

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
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
      this.productChoosen = data;
      this.toggleProductDetail();
    });
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
}

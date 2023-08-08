import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';
import { PRODUCT_INITIAL_STATE } from 'src/app/constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product = PRODUCT_INITIAL_STATE;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProductDetail = new EventEmitter<string>();

  constructor() {}

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProductDetail.emit(this.product.id);
  }
}

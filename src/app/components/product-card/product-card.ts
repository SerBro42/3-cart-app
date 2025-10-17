import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html'
})
export class ProductCardComponent {

  //This info comes from the parent component, CatalogueComponent, hence we use @Input
  @Input() product!: Product;

  //This sends information to a parent component (catalogue component), hence we use @Output
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}

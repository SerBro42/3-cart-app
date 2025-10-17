import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card";
import { products } from '../../data/product.data';

@Component({
  selector: 'app-catalogue',
  imports: [ProductCardComponent],
  templateUrl: './catalogue.html'
})
export class CatalogueComponent {

  //This info comes from a parent component, the cart-app (main component), hence we use @Input
  @Input() products!: Product[];

  //This sends information to a parent component (cart-app, or main component), hence we use @Output
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product) {
    this.productEventEmitter.emit(product);
  }

}

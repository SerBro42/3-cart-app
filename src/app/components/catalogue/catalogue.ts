import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card";
import { products } from '../../data/product.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  imports: [ProductCardComponent],
  templateUrl: './catalogue.html'
})
export class CatalogueComponent {

  //This info comes from a parent component, the cart-app (main component), hence we use @Input
  //Now this info comes from a router
  products!: Product[];

  //This sends information to a parent component (cart-app, or main component), hence we use @Output
  //Output no longer needed because we use a router.
  productEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor(private router: Router) {
    this.products = this.router.currentNavigation()?.extras.state!['products'];
  }

  onAddCart(product: Product) {
    this.productEventEmitter.emit(product);
  }

}

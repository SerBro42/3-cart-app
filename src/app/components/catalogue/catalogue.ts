import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card";
import { products } from '../../data/product.data';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data';

@Component({
  selector: 'app-catalogue',
  imports: [ProductCardComponent],
  templateUrl: './catalogue.html'
})
export class CatalogueComponent {

  //This info comes from a parent component, the cart-app (main component), hence we use @Input
  //Now this info comes from a router
  products!: Product[];

  constructor(private SharingDataService: SharingDataService, private router: Router) {
    this.products = this.router.currentNavigation()?.extras.state!['products'];
  }

  onAddCart(product: Product) {
    this.SharingDataService.productEventEmitter.emit(product);
  }

}

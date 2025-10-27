import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card";
import { products } from '../../data/product.data';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data';
import { ProductService } from '../../services/product';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'app-catalogue',
  imports: [ProductCardComponent],
  templateUrl: './catalogue.html'
})
export class CatalogueComponent implements OnInit {

  //This info comes from a parent component, the cart-app (main component), hence we use @Input
  //Now this info comes from a router
  products!: Product[];

  constructor(
    private store: Store<{products: any}>,
    private productService: ProductService,
    private SharingDataService: SharingDataService) {
      this.store.select('products').subscribe(state => this.products = state.products)
    }

  ngOnInit(): void {
      //this.products = this.productService.findAll();
      this.store.dispatch(load({products: this.productService.findAll()}));
  }

  onAddCart(product: Product) {
    this.SharingDataService.productEventEmitter.emit(product);
  }

}

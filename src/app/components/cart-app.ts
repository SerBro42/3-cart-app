import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { CatalogueComponent } from './catalogue/catalogue';
import { CartComponent } from './cart/cart';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'cart-app',
  imports: [CatalogueComponent, CartComponent],
  templateUrl: './cart-app.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  items: CartItem[] = [];

  constructor(private service: ProductService) {

  }

  //When the application gets initialised, the product service that was previously initialised gets called
  //and populates our empty Product array with products returned by the service
  ngOnInit(): void {
    this.products = this.service.findAll();
  }

  //Method that finally adds the new product to the existing array of Products, which is the cart
  // (called 'items' in this case).
  //If the product exists already, increases the quantity by 1. Otherwise, it is added to the list.
  onAddCart(product: Product) {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if(hasItem) {
      //The map() function returns a new instance of the array, but modified
      this.items = this.items.map(item => {
        if(item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: {... product}, quantity: 1 }];
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { CatalogueComponent } from './catalogue/catalogue';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar';
import { CartModalComponent } from './cart-modal/cart-modal';

@Component({
  selector: 'cart-app',
  imports: [CatalogueComponent, CartModalComponent, NavbarComponent],
  templateUrl: './cart-app.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  showCart: boolean = false;

  constructor(private service: ProductService) {

  }

  //When the application gets initialised, the product service that was previously initialised gets called
  //and populates our empty Product array with products returned by the service
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  //Method that finally adds the new product to the existing array of Products, which is the cart
  // (called 'items' in this case).
  //If the product exists already, increases the quantity by 1. Otherwise, it is added to the list.
  onAddCart(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if (hasItem) {
      //The map() function returns a new instance of the array, but modified
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession();
  }

  //The filter() function creates a new instance of the array
  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }

  //The reduce() funcition reduces a data flux into a single variable. In this case, we use a 'for' to iterate
  //through all the items and their price value, and return a single variable that is the sum of all previous ones.
  calculateTotal(): void {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.quantity * item.product.price, 0);
  }

  //We save the array of products in our session storage. Challenge: data are saved in session storage is saved in form of
  // as String, and our shopping cart list is an array (object). We must transform that object into a String.
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  //This clever trick turns a boolean variable to its opposite.
  //Name changed from 'open' to 'openClose' for more clarity.
  openCloseCart(): void {
    this.showCart = !this.showCart;
  }

}

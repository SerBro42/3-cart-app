import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html'
})
//WARNING: not to be confused with the CartAppComponent.
//We implemented OhChanges in this component in order to reduce boilerplate code in the main component (multiple
//instances of saveSession and calculateTotal).
export class CartComponent implements OnChanges{

  @Input() items: CartItem[] = [];

  //This time, the value is local, rather than coming from a parent
  total = 0;

  //Information is being transmitted from a child component to its parent, hence we use Output
  @Output() idProductEventEmitter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    //let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
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
}

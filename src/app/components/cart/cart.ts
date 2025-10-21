import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html'
})
//WARNING: not to be confused with the CartAppComponent.
//We implemented OhChanges in this component in order to reduce boilerplate code in the main component (multiple
//instances of saveSession and calculateTotal).
export class CartComponent {

  items: CartItem[] = [];

  //This time, the value is local, rather than coming from a parent
  total = 0;

  //Information is being transmitted from a child component to its parent, hence we use Output
  idProductEventEmitter = new EventEmitter();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}

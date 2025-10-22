import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';

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

  //With this constructor, we share the 'state' of the information between our routes - see navbar.html. In this case
  // with our cart component. The main component passes the state of the items to the navbar component.
  //During the time of this course, getCurrentNavigation() is deprecated, having to use currentNavigation()
  //instead.
  constructor(private router: Router) {
    this.items = this.router.currentNavigation()?.extras.state!['items'];
    this.total = this.router.currentNavigation()?.extras.state!['totla'];

  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}

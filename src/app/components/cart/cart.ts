import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html'
})
//WARNING: not to be confused with the CartAppComponent
export class CartComponent {

  @Input() items: CartItem[] = [];

  //This value comes from the parent component: CartAppComponent
  @Input() total = 0;

  //Information is being transmitted from a child component to its parent, hence we use Output
  @Output() idProductEventEmitter = new EventEmitter();

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }
}

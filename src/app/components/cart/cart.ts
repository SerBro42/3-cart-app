import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html'
})
//WARNING: not to be confused with the CartAppComponent
export class CartComponent {

  @Input() items: CartItem[] = [];

  //No items are being imported, and so, none are shown
}

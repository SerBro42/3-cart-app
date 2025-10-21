import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.html'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  //Name changed from 'open' to 'close' for more clarity.
  @Output() closeEventEmitter = new EventEmitter();

  //Name changed from 'open' to 'close' for more clarity.
  closeCart(): void {
    this.closeEventEmitter.emit();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id);
  }

}

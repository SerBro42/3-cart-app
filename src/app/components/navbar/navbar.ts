import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html'
})
export class NavbarComponent {

  //The data regarding the cart item array comes from a parent component, hence we use @Input.
  @Input() items: CartItem[] = [];

  //The button pushing event is sent from a child to a parent component (cart-app), hence the @Output.
  @Output() openEventEmitter = new EventEmitter();

  openCart(): void {
    this.openEventEmitter.emit();
  }

}

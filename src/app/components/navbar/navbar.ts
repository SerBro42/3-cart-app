import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html'
})
export class NavbarComponent {

  //The data regarding the cart item array comes from a parent component, hence we use @Input.
  @Input() items: CartItem[] = [];

}

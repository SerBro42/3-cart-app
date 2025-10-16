import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartAppComponent } from './components/cart-app/cart-app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartAppComponent],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('3-cart-app');
}

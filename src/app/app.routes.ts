import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart';
import { CatalogueComponent } from './components/catalogue/catalogue';

export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'catalogue', component: CatalogueComponent }
];

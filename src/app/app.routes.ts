import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart';
import { CatalogueComponent } from './components/catalogue/catalogue';

//By means of redirectTo, if the route in the URL is empty (''), the page redirects to '/catalog'
export const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full'},
  { path: 'cart', component: CartComponent },
  { path: 'catalogue', component: CatalogueComponent }
];

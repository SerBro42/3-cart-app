import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card";

@Component({
  selector: 'app-catalogue',
  imports: [ProductCardComponent],
  templateUrl: './catalogue.html'
})
export class CatalogueComponent {

  //This info comes from a parent component, the cart-app (main component), hence we use @Input
  @Input() products!: Product[];

}

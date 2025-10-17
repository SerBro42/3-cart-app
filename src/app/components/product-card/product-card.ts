import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './product-card.html'
})
export class ProductCardComponent {

  //This info comes from the parent component, CatalogueComponent, hence we use @Input
  @Input() product!: Product;

}

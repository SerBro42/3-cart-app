import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'cart-app',
  imports: [],
  templateUrl: './cart-app.html'
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  constructor(private service: ProductService) {

  }

  //When the application gets initialised, the product service that was previously initialised gets called
  //and populates our empty Product array with products returned by the service
  ngOnInit(): void {
    this.products = this.service.findAll();
  }


}

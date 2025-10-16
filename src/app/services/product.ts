import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Normally, this product array comes from a REST API by means of an HTTP request. For now, we will import it from our example data TS file.
  findAll(): Product[] {
    return products;
  }

}

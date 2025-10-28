import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Normally, this product array comes from a REST API by means of an HTTP request. For now, we will import it from our example data TS file.
  //Now, we turn Product array into an Observable, because we expanded the functionality of our program from merely retrieving Products from a
  //hardcoded TS class to retrieving them from an Effect. HTTPclient uses Observable.
  findAll(): Observable<Product[]> {
    return of(products);
  }

}

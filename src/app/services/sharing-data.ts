import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  //For deleting
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  //For showing the whole product on the list
  private _productEventEmitter: EventEmitter<Product> = new EventEmitter();

  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter;
  }

  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }

}

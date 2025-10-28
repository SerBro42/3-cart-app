import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data';
import { ItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { total } from '../../store/items.actions';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html'
})
//WARNING: not to be confused with the CartAppComponent.
//We implemented OhChanges in this component in order to reduce boilerplate code in the main component (multiple
//instances of saveSession and calculateTotal).
export class CartComponent implements OnInit {

  items: CartItem[] = [];

  //This time, the value is local, rather than coming from a parent
  total = 0;

  //With this constructor, we share the 'state' of the information between our routes - see navbar.html. In this case
  // with our cart component. The main component passes the state of the items to the navbar component.
  //During the time of this course, getCurrentNavigation() is deprecated, having to use currentNavigation()
  //instead.
  //Constructor refactored as of part 81. Information about items and total extracted from state
  constructor(
    private store: Store<{ items: ItemsState }>,
    private SharingDataService: SharingDataService) {

    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    })
  }
  ngOnInit(): void {
    //this.store.dispatch(total());
  }

  onDeleteCart(id: number) {
    this.SharingDataService.idProductEventEmitter.emit(id);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { CatalogueComponent } from './catalogue/catalogue';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data';
import Swal from 'sweetalert2';
import { ItemsState } from '../store/items.reducer';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [CatalogueComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  constructor(
    private store: Store<{items: ItemsState}>,
    private router: Router,
    private SharingDataService: SharingDataService) {
      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.total = state.total;
      })
     }

  //When the application gets initialised, the product service that was previously initialised gets called
  //and populates our empty Product array with products returned by the service
  ngOnInit(): void {
    this.store.dispatch(total());
    //ngOnInit doesn't execute this method, it only subscribes to the service to listen to any ID call.
    this.onDeleteCart();
    //we subscribe to this method in order to listen to the event of adding a product.
    this.onAddCart();
  }

  //Method that finally adds the new product to the existing array of Products, which is the cart
  // (called 'items' in this case).
  //If the product exists already, increases the quantity by 1. Otherwise, it is added to the list.
  onAddCart(): void {
    this.SharingDataService.productEventEmitter.subscribe(product => {

      //By means of dispatch we call upon the "add" action, declared in our 'actions' file
      this.store.dispatch(add({ product: product }));
      this.store.dispatch(total());

      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total }
      })

      Swal.fire({
        title: "Da Shopping",
        text: "Article added to the cart",
        icon: "success"
      });
    });
  }

  //The filter() function creates a new instance of the array
  //We need to explicitly clear the object 'cart' from sessionStorage after reaching length=0, because
  //otherwise, if we delete the last element and refresh the page, the last element of the list before deletion persists. The reason
  //being that the initial state of the object is [], and so leaving it at [] is not considered as a 'change'.
  //We created a service for sharing data, and so we subscribe to that service to get our product ID.
  onDeleteCart(): void {
    this.SharingDataService.idProductEventEmitter.subscribe(id => {
      console.log(id + ' executing event idProductEventEmitter');

      Swal.fire({
        title: "Confirm delete article",
        text: "Are you sure you wish to remove this article from the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          //By means of dispatch, we call upon the remove action, saved in our 'actions' file.
          this.store.dispatch(remove({id: id}));
          this.store.dispatch(total());
          this.saveSession();

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            //This does NOT refresh the window after deleting
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total }
            })
          })

          Swal.fire({
            title: "Deleted!",
            text: "Article removed from the shopping cart",
            icon: "success"
          });
        }
      });


    })
  }

  // //We save the array of products in our session storage. Challenge: data are saved in session storage is saved in form of
  // // as String, and our shopping cart list is an array (object). We must transform that object into a String.
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}

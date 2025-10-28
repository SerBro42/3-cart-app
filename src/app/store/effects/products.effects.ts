import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import { findAll, load } from "../products.actions";

@Injectable()
export class ProductsEffects {

  //See the diagram in README to see where Effect in relation to the general state management diagram.
  //The reducer creates a new state for our application with the products that arrive from the back-end by means of exhaustMap().
  loadProduct$ = createEffect(
    () => this.actions$.pipe(
      ofType(load),
      exhaustMap(() => this.service.findAll())
    ).pipe(
      map( products => ( findAll( {products} ))),
      catchError(() => EMPTY)
    )
  );


  //By convention, a variable name ended in '$' is a reactive component. Reactive components are part of Angular's
  //reactive forms
  constructor(
    private actions$: Actions,
    private service: ProductService) {

    }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, withLatestFrom } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  EMPTY,
  of,
  switchMap,
  Observable,
} from 'rxjs';
import {
  favoriteClick,
  favoriteDetailsClick,
  favoritePageInit,
  loadFavoritesListSuccess,
  loadPokemonDetails,
  loadPokemonDetailsSuccess,
  loadPokemonsList,
  loadPokemonsListInfoSuccess,
  loadPokemonsListSuccess,
} from '../actions/app.actions';
import { AppHelper } from '../helpers/app.helper';
import { AppState } from '../interfaces/app.state';
import { PokemonsService } from '../services/pokemons.service';

@Injectable()
export class AppEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private pokemonsService: PokemonsService,
    private router: Router
  ) {}

  favoritePageInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoritePageInit),
      withLatestFrom(this.store.select((state: any) => state.AppState)),
      switchMap((state) => {
        const favorites = AppHelper.GetFavoriteListFromStorage();
        const namesRequests: Observable<any>[] = [];

        favorites.forEach((element: any) => {
          namesRequests.push(
            this.pokemonsService.getByName(element.name).pipe(map((e) => e))
          );
        });

        return combineLatest(namesRequests);
      }),
      mergeMap((response) =>
        of(loadFavoritesListSuccess({ results: response }))
      )
    )
  );

  loadPokemons$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadPokemonsList),
        mergeMap((payload) =>
          this.pokemonsService.getAll(payload.pageNumber).pipe(
            switchMap((response: any) => {
              const names: Observable<any>[] = [];

              response.results.forEach((element: any) => {
                names.push(
                  this.pokemonsService
                    .getByName(element.name)
                    .pipe(map((e) => e))
                );
              });

              this.store.dispatch(loadPokemonsListSuccess(response));

              return combineLatest(names);
            }),
            mergeMap((pokemons) => {
              this.store.dispatch(loadPokemonsListInfoSuccess([pokemons]));
              return EMPTY;
            }),
            catchError(() => EMPTY)
          )
        )
      ),
    { dispatch: false }
  );
  loadPokemonDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadPokemonDetails),
        mergeMap((payload) =>
          this.pokemonsService.getByName(payload.name).pipe(
            mergeMap((response) => {
              this.store.dispatch(loadPokemonDetailsSuccess(response));
              this.router.navigate(['pokemon-details']);
              return EMPTY;
            }),
            catchError(() => EMPTY)
          )
        )
      ),
    { dispatch: false }
  );

  favoriteDetailsClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(favoriteDetailsClick),
      withLatestFrom(this.store.select((state: any) => state.AppState)),
      mergeMap(([payload, state]) => {
        const currentPokemon = state.PokemonsList.find(
          (e: any) => e.name === payload.name
        );

        if (currentPokemon != null) {
          return of(favoriteClick({ pokemon: currentPokemon }));
        }

        return EMPTY;
      })
    )
  );
}

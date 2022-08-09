import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  favoriteClick,
  loadPokemonDetails,
  loadPokemonsList,
} from 'src/app/actions/app.actions';
import { AppState } from 'src/app/interfaces/app.state';
import { selectFeaturePokemonsList } from 'src/app/selectors/selectors';
import { PokemonsListModel } from './pokemons-list.model';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.PokemonsListModel$ = this.store.select(selectFeaturePokemonsList);
  }

  PokemonsListModel$: Observable<PokemonsListModel>;
  PageEvent: PageEvent | undefined;
  currentPageFromUrl: number = 0;
  private querySubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.currentPageFromUrl = Number.parseInt(queryParam['page']);
        if (this.currentPageFromUrl > 0) {
          this.store.dispatch(
            loadPokemonsList({ pageNumber: (this.currentPageFromUrl - 1) * 10 })
          );
        } else {
          this.updateQueryParams(0);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  loadPokemons(pageNumber: number) {
    this.updateQueryParams(pageNumber);
  }

  refreshPokemons() {
    this.store.dispatch(
      loadPokemonsList({ pageNumber: (this.currentPageFromUrl - 1) * 10 })
    );
  }

  favoriteClick(pokemon: any) {
    this.store.dispatch(favoriteClick({ pokemon: pokemon }));
  }

  cardClick(name: any) {
    this.store.dispatch(loadPokemonDetails({ name: name }));
  }

  private updateQueryParams(pageNumber: number) {
    const queryParams: Params = { page: pageNumber + 1 };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}

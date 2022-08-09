import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  favoriteClick,
  favoritePageInit,
  loadPokemonDetails,
} from 'src/app/actions/app.actions';
import { AppState } from 'src/app/interfaces/app.state';
import { selectFeatureFavourites } from 'src/app/selectors/selectors';
import { FavoritesListModel } from './favourite.model';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.FavoritesListModel$ = this.store.select(selectFeatureFavourites);
  }

  FavoritesListModel$: Observable<FavoritesListModel>;

  ngOnInit(): void {
    this.store.dispatch(favoritePageInit());
  }

  favoriteClick(pokemon: any) {
    this.store.dispatch(favoriteClick({ pokemon: pokemon }));
  }

  cardClick(name: any) {
    this.store.dispatch(loadPokemonDetails({ name: name }));
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { favoriteDetailsClick } from 'src/app/actions/app.actions';
import { AppState } from 'src/app/interfaces/app.state';
import { selectFeatureCurrentPokemon } from 'src/app/selectors/selectors';
import { PokemonDetailsModel } from './details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  constructor(private store: Store<AppState>, private router: Router) {
    this.PokemonDetailsModel$ = this.store.select(selectFeatureCurrentPokemon);

    const currentNavigation = this.router.getCurrentNavigation();

    if (currentNavigation?.previousNavigation == null) {
      this.router.navigate(['pokemons-list']);
    }
  }

  PokemonDetailsModel$: Observable<PokemonDetailsModel>;

  favoriteClick(name: string) {
    this.store.dispatch(favoriteDetailsClick({ name: name }));
  }
}

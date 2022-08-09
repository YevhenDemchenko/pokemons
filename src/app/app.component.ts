import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppModel } from './app.model';
import { AppState } from './interfaces/app.state';
import { selectFeatureGlobalSpinner } from './selectors/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokemons';
  constructor(private router: Router, private store: Store<AppState>) {
    this.AppModel$ = this.store.select(selectFeatureGlobalSpinner);
  }

  AppModel$: Observable<AppModel>;

  goToPokemonsList() {
    this.router.navigate(['pokemons-list']);
  }

  goToFavoritesList() {
    this.router.navigate(['favourites']);
  }
}

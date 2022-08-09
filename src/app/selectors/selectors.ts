import { createSelector } from '@ngrx/store';
import { AppModel } from '../app.model';
import { PokemonDetailsModel } from '../components/details/details.model';
import { FavoritesListModel } from '../components/favourite/favourite.model';
import { PokemonsListModel } from '../components/pokemons-list/pokemons-list.model';
import { AppState, Pokemon } from '../interfaces/app.state';

export const globalSpinnerFeature = (state: any) =>
  state.AppState.IsGlobalSpinnerActive;
export const pokemonsListFeature = (state: any) => state.AppState;
export const currentPokemonFeature = (state: any) =>
  state.AppState.CurrentPokemon;
export const favouritesFeature = (state: any) => state.AppState;

export const selectFeatureGlobalSpinner = createSelector(
  globalSpinnerFeature,
  (state: any) => {
    return AppModel.Create(state);
  }
);

export const selectFeaturePokemonsList = createSelector(
  pokemonsListFeature,
  (state: any) => {
    return PokemonsListModel.Create(state);
  }
);

export const selectFeatureCurrentPokemon = createSelector(
  currentPokemonFeature,
  (state: Pokemon) => {
    return PokemonDetailsModel.Create(state);
  }
);

export const selectFeatureFavourites = createSelector(
  favouritesFeature,
  (state: any) => FavoritesListModel.Create(state)
);

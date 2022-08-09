import { createReducer, on } from '@ngrx/store';
import {
  favoriteClick,
  favoritePageInit,
  loadFavoritesListSuccess,
  loadPokemonDetails,
  loadPokemonDetailsSuccess,
  loadPokemonsList,
  loadPokemonsListInfoSuccess,
  loadPokemonsListSuccess,
} from '../actions/app.actions';
import { AppHelper } from '../helpers/app.helper';
import { AppState, DefaultAppState, Pokemon } from '../interfaces/app.state';

export const initialState = DefaultAppState;

export const appReducer = createReducer(
  initialState,
  on(loadPokemonsList, (state: AppState) => {
    return {
      ...state,
      IsGlobalSpinnerActive: true,
    };
  }),
  on(favoritePageInit, (state: AppState) => {
    return {
      ...state,
      IsGlobalSpinnerActive: true,
    };
  }),
  on(loadPokemonsListSuccess, (state: AppState, payload) => {
    const nextPage =
      Number.parseInt(
        payload?.next?.substring(
          payload?.next?.indexOf('offset=') + 7,
          payload?.next?.indexOf('&')
        )
      ) || 0;
    const prevPage =
      Number.parseInt(
        payload?.previous?.substring(
          payload?.previous?.indexOf('offset='),
          payload?.previous?.indexOf('&')
        )
      ) || 0;
    const currentPage = nextPage - 10;

    const pokemons: any = payload.results.map((e: any) => {
      return { ...e, isFavourite: AppHelper.IsPokemonInFavoriteList(e.name) };
    });
    const favorites = AppHelper.GetFavoriteListFromStorage();

    return {
      ...state,
      PokemonsList: pokemons,
      CurrentPage: currentPage,
      NextPage: nextPage,
      PreviousPage: prevPage,
      TotalCount: payload.count,
      Favourites: favorites,
    };
  }),
  on(loadFavoritesListSuccess, (state: AppState, payload) => {
    const pokemons: any = payload.results.map((e: any) => {
      return {
        ...e,
        isFavourite: AppHelper.IsPokemonInFavoriteList(e.name),
        imgUrl: e.sprites.front_shiny,
      };
    });

    return {
      ...state,
      PokemonsList: pokemons,
      IsGlobalSpinnerActive: false,
      Favourites: pokemons,
    };
  }),
  on(loadPokemonsListInfoSuccess, (state: AppState, payload: any[]) => {
    const pokemonsList = Object.Clone(state.PokemonsList);
    const arr: any[] = payload[0];

    arr.map((element: any) => {
      const currentPokemon = pokemonsList.find(
        (e: any) => e.name === element.name
      );
      if (currentPokemon) {
        currentPokemon.imgUrl = element.sprites.front_shiny;
      }
    });

    return {
      ...state,
      PokemonsList: pokemonsList,
      IsGlobalSpinnerActive: false,
    };
  }),
  on(favoriteClick, (state: AppState, payload) => {
    const nextState = Object.Clone(state);
    const pokemonsList = Object.Clone(state.PokemonsList);
    let favorites: Pokemon[] = Object.Clone(state.Favourites);

    if (AppHelper.IsPokemonInFavoriteList(payload.pokemon.name)) {
      AppHelper.RemovePokemonFromFavoriteList(payload.pokemon.name);
      const currentPokemonIndex = favorites.findIndex(
        (e) => e.name === payload.pokemon.name
      );

      if (currentPokemonIndex > -1) {
        favorites.splice(currentPokemonIndex, 1);
      }

      pokemonsList.forEach((e: Pokemon) => {
        if (e.name === payload.pokemon.name) {
          e.isFavourite = false;
          return;
        }
      });
    } else {
      AppHelper.AddPokemonInFavoriteList(payload.pokemon);
      const currentPokemon = pokemonsList.find(
        (e: any) => e.name === payload.pokemon.name
      );
      if (currentPokemon) {
        currentPokemon.isFavourite = true;
        favorites.push(currentPokemon);
      }
    }

    if (state.CurrentPokemon.name != '') {
      nextState.CurrentPokemon.isFavourite = AppHelper.IsPokemonInFavoriteList(
        payload.pokemon.name
      );
    }

    nextState.Favourites = favorites;
    nextState.PokemonsList = pokemonsList;

    return nextState;
  }),
  on(loadPokemonDetails, (state: AppState) => {
    const nextState = Object.Clone(state);

    nextState.IsGlobalSpinnerActive = true;

    return nextState;
  }),
  on(loadPokemonDetailsSuccess, (state: AppState, payload) => {
    const nextState = Object.Clone(state);

    nextState.CurrentPokemon.name = payload.name;
    nextState.CurrentPokemon.stats = payload.stats;
    nextState.CurrentPokemon.height = payload.height;
    nextState.CurrentPokemon.imgUrl = payload.sprites.front_shiny;
    nextState.IsGlobalSpinnerActive = false;
    nextState.CurrentPokemon.isFavourite = AppHelper.IsPokemonInFavoriteList(
      payload.name
    );

    return nextState;
  })
);

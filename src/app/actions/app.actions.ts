import { createAction, props } from "@ngrx/store";
import { Pokemon } from "../interfaces/app.state";

export const loadPokemonsList = createAction('[Common] Load Pokemons List', props<{pageNumber: number}>());
export const loadPokemon = createAction('[Common] Load Pokemon');
export const loadPokemonsListSuccess = createAction('[Common] Load Pokemons List Success', props<any>());
export const loadPokemonsListInfoSuccess = createAction('[Common] Load Pokemons List Info Success', props<any>());


export const favoritePageInit = createAction('[Common] Favorite Page Init');
export const loadFavoritesListSuccess = createAction('[Common] Load Favorites List Success', props<{results: any[]}>());
export const favoriteClick = createAction('[Common] Favorite Click', props<{pokemon: Pokemon}>());
export const favoriteDetailsClick = createAction('[Common] Favorite Details Click', props<{name: string}>());


export const loadPokemonDetails = createAction('[Common] Load Pokemon Details', props<{name: string}>());

export const loadPokemonDetailsSuccess = createAction('[Common] Load Pokemon Details Success', props<any>());


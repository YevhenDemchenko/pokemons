export interface AppState {
  CurrentPokemon: Pokemon;
  PokemonsList: Pokemon[];
  Favourites: any[];
  CurrentPage: number;
  PreviousPage: number;
  NextPage: number;
  IsGlobalSpinnerActive: boolean;
  TotalCount: number;
}

export const DefaultAppState: AppState = {
  CurrentPokemon: {
    height: 0,
    name: '',
    stats: [],
    isFavourite: false,
    imgUrl: '',
  },
  PokemonsList: [],
  Favourites: [],
  CurrentPage: 0,
  PreviousPage: 0,
  NextPage: 0,
  IsGlobalSpinnerActive: true,
  TotalCount: 0,
};

export interface Pokemon {
  height: number;
  name: string;
  stats: Stats[];
  isFavourite: boolean;
  imgUrl: string;
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

import { Pokemon } from '../interfaces/app.state';

export class AppHelper {
  static IsPokemonInFavoriteList(name: string): boolean {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex((e: Pokemon) => e.name === name);

    return index > -1;
  }

  static AddPokemonInFavoriteList(pokemon: any): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    favorites.push(pokemon);

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  static RemovePokemonFromFavoriteList(name: any): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex((e: any) => e.name === name);

    favorites.splice(index, 1);

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  static GetFavoriteListFromStorage(): any[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}

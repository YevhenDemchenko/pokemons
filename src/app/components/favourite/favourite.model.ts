import { AppState, Pokemon } from 'src/app/interfaces/app.state';

export class FavoritesListModel {
  FavoritesList: Pokemon[] = [];
  IsGlobalSpinnerActive: boolean = false;
  CurrentPage: number = 0;
  TotalCount: number = 0;

  public static Create(state: any): FavoritesListModel {
    const model = new FavoritesListModel();

    model.IsGlobalSpinnerActive = state.IsGlobalSpinnerActive;
    model.FavoritesList = state.Favourites;

    return model;
  }
}

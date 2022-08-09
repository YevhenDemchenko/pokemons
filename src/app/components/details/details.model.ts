import { Pokemon, Stats } from 'src/app/interfaces/app.state';

export class PokemonDetailsModel {
  IsGlobalSpinnerActive: boolean = false;
  PokemonName: string = '';
  IsFavourite: boolean = false;
  Height: number = 0;
  ImgUrl: string = '';
  Stats: Stats[] = [];

  public static Create(state: Pokemon): PokemonDetailsModel {
    const model = new PokemonDetailsModel();

    if (state.name == '') return model;

    model.PokemonName = state.name;
    model.IsFavourite = state.isFavourite;
    model.Height = state.height;
    model.ImgUrl = state.imgUrl;
    model.Stats = state.stats;

    return model;
  }
}

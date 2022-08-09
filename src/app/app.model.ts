import { Pokemon } from 'src/app/interfaces/app.state';

export class AppModel {
  IsGlobalSpinnerActive: boolean = false;

  public static Create(isSpinnerActive: boolean): AppModel {
    const model = new AppModel();

    model.IsGlobalSpinnerActive = isSpinnerActive;

    return model;
  }
}

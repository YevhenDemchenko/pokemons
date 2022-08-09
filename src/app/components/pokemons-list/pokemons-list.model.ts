import { AppState, Pokemon } from "src/app/interfaces/app.state";

export class PokemonsListModel {
    PokemonsList: Pokemon[] = [];
    IsGlobalSpinnerActive: boolean = false;
    CurrentPage: number = 0;
    TotalCount: number = 0;

    public static Create(state: any): PokemonsListModel {
        const model = new PokemonsListModel();

        model.IsGlobalSpinnerActive = state.IsGlobalSpinnerActive;
        model.PokemonsList = state.PokemonsList;
        model.CurrentPage = state.CurrentPage / 10;
        model.TotalCount = state.TotalCount;
        

        return model;
    }
}
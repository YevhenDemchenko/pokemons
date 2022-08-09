import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';

const routes: Routes = [
  { path: 'pokemons-list', component: PokemonsListComponent },
  { path: '', redirectTo: '/pokemons-list', pathMatch: 'full' },
  { path: 'pokemon-details', component: DetailsComponent },
  { path: 'favourites', component: FavouriteComponent },
  { path: '**', redirectTo: '/pokemons-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

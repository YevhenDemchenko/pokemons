import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { DetailsComponent } from './components/details/details.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { EffectsModule } from '@ngrx/effects';
import { PokemonsService } from './services/pokemons.service';
import { AppEffect } from './effects/app.effect';
import { HttpClientModule } from '@angular/common/http';
import { appReducer } from './reducers/app.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { CardGridComponent } from './components/card-grid/card-grid.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

const material = [
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    DetailsComponent,
    FavouriteComponent,
    CardGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ AppState: appReducer }),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AppEffect]),
    HttpClientModule,
    material,
  ],
  exports: [material, CardGridComponent],
  providers: [PokemonsService],
  bootstrap: [AppComponent],
})
export class AppModule {}

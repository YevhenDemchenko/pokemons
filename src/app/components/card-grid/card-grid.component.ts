import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/app.state';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
})
export class CardGridComponent {
  constructor() {}
  @Input() PokemonsList: Pokemon[] = [];
  @Output() cardClicked = new EventEmitter<string>();
  @Output() favoriteClicked = new EventEmitter<Pokemon>();

  favoriteClick(pokemon: Pokemon) {
    this.favoriteClicked.emit(pokemon);
  }

  cardClick(name: string) {
    this.cardClicked.emit(name);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonsUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  getAll(offset: number) {
    return this.http.get(PokemonsUrl + '?limit=10&offset=' + offset);
  }

  getByName(name: string) {
    return this.http.get(PokemonsUrl + `/${name}`);
  }
}

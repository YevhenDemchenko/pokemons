import { environment } from 'src/environments/environment';

export const MainUrl = environment.baseUrl;
export const PokemonsUrl = `${MainUrl}/pokemon`;

declare global {
  interface ObjectConstructor {
    Clone<T>(object: T): T;
  }
}

Object.Clone = <T>(source: T): T => {
  if (source == null) {
    return source;
  }

  const objectString = JSON.stringify(source);
  const result = JSON.parse(objectString);

  return result;
};

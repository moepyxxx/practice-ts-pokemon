import { Pokemon } from '../../model/pokemon/Pokemon';

export type TWildPokemons = {
  trigger: 'すすむ' | 'つりする' | 'はなしかける' | 'イベント';
  pokemon: Pokemon;
  appearingRate: number;
  lebelRange: number[];
};
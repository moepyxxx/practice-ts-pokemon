import { ExceptPokemon } from '../../model/pokemon/ExceptPokemon';

export type TWildPokemons = {
  trigger: 'すすむ' | 'つりする' | 'はなしかける';
  exceptPokemon: ExceptPokemon;
  appearingRate: number;
  lebelRange: number[];
};
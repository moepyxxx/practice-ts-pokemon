import { ExceptPokemon } from '../../model/pokemon/ExceptPokemon';

export interface IWildPokemons {
  _wildPokemons: {
    trigger: 'すすむ' | 'つりする' | 'はなしかける';
    exceptPokemon: ExceptPokemon;
    appearingRate: number;
    lebelRange: number[];
  }[];
}
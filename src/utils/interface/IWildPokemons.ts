import { ExceptPokemon } from '../../model/pokemon/ExceptPokemon';

export interface IWildPokemons {
  wildPokemons: {
    trigger: 'すすむ' | 'つりする' | 'はなしかける';
    exceptPokemon: ExceptPokemon;
    appearingRate: number;
    lebelRange: number[];
  }[];
}
import { ExceptPokemon } from '../../model/pokemon/ExceptPokemon';

export interface IWildPokemons {
  wildPokemons:{
    exceptPokemon: ExceptPokemon;
    appearingRate: number;
    lebelRange: number[];
  }[];
}
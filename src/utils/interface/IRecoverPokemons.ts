import { OwnPokemon } from '../../model/pokemon/OwnPokemon';

export interface IRecoverPokemons {
  recoverPokemons: (pokemons: OwnPokemon[]) => void;
}
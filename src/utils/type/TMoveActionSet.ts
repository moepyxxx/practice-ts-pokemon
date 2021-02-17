import { Move } from "../../model/move/Move";
import { ExceptPokemon } from "../../model/pokemon/ExceptPokemon";
import { OwnPokemon } from "../../model/pokemon/OwnPokemon";

export type TMoveActionSet = {
  attack: OwnPokemon | ExceptPokemon;
  defense: OwnPokemon | ExceptPokemon;
  move: Move;
}
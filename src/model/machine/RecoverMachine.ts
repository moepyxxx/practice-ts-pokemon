import { OwnPokemon } from "../pokemon/OwnPokemon";

export class RecoverMachine {
  public static _instance: RecoverMachine;

  private constructor() {}

  public recoverPokemon(...pokemons: OwnPokemon[]) {
    pokemons.forEach(pokemon => {
      pokemon._remainingHp = pokemon.basicTotalStatus.hp;
      pokemon._statusAilment = null;
    });
  }

  public static getInstance(): RecoverMachine {
    if (!this._instance) {
      this._instance = new RecoverMachine();
    }
    return this._instance;
  }
}
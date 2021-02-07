import { Pokemon } from "../__old/classes/Pokemon";

export class OwnPokemon {
  /**
   * ポケモン
   */
  _pokemon: ExceptPokemon;

  /**
   * ニックネーム
   */
  _nickname: string;

  /**
   * もっているわざ
   */
  _moveList: Move[];

  constructor(pokemon: ExceptPokemon, nickname?: string) {
    this._nickname = nickname ?? Pokemon.name;
    this._pokemon = pokemon;
    this._pokemon = pokemon.moveList;
  }
}
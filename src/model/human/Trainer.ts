import { Human } from './Human';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { IOnHandPokemons } from '../../utils/interface/IOnHandPokemons';
import { ITalk } from '../../utils/interface/ITalk';

export class Trainer extends Human implements ITalk, IOnHandPokemons {
  
  /**
   * 手持ちポケモン
   */
  _onHandPokemons: OwnPokemon[];

  constructor(name: string, gender: '男' | '女', onHandPokemon?: OwnPokemon[]) {
    super(name, gender);
    this._onHandPokemons = onHandPokemon? this._onHandPokemons : [];
  }

  set onHandPokemons(onHandPokemons: OwnPokemon[]) {
    this._onHandPokemons = onHandPokemons;
  }

  /**
   * 話す
   */
  talk() {
    return;
  }
}
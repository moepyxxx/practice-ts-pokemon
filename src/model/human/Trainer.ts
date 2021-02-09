import { Human } from './Human';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { IOnHandPokemons } from '../../utils/interface/IOnHandPokemons';
import { ITalk } from '../../utils/interface/ITalk';

export class Trainer extends Human implements ITalk, IOnHandPokemons {
  
  /**
   * 手持ちポケモン
   */
  _onHandPokemons: OwnPokemon[];

  constructor(name: string, gender: '男' | '女') {
    super(name, gender);
  }

  /**
   * 話す
   */
  talk() {
    return;
  }
}
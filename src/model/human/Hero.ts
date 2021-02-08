import { Human } from './Human';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { IOnHandPokemons } from '../../utils/interface/IOnHandPokemons';

export class Hero extends Human implements IOnHandPokemons {

  /**
   * 所持金
   */
  protected _pocketMoney: number;

  /**
   * 持っている全てのポケモン
   */
  haveAllPokemons: OwnPokemon[];

  /**
   * 手持ちポケモン
   */
  onHandPokemons: OwnPokemon[];

  constructor(name: string, gender: '男' | '女') {
    super(name, gender);
  }
}
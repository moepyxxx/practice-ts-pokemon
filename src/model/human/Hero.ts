import { Human } from './Human';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { IOnHandPokemons } from '../../utils/interface/IOnHandPokemons';

export class Hero extends Human implements IOnHandPokemons {
  
  private static _instance: Hero;

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

  private constructor(name: string, gender: '男' | '女') {
    super(name, gender);
  }

  public static getInstance(): Hero {
    if (!this._instance) {
      this._instance = new Hero('名前', '男');
    }
    return this._instance;
  }
}
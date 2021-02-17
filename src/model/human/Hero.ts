import { Human } from './Human';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { IOnHandPokemons } from '../../utils/interface/IOnHandPokemons';
import { THeroStatus } from '../../utils/type/THeroStatus';

export class Hero extends Human implements IOnHandPokemons {
  
  private static _instance: Hero;

  /**
   * 所持金
   */
  private _pocketMoney: number = 1000;

  /**
   * 持っている全てのポケモン
   */
  _haveAllPokemons: OwnPokemon[] = [];

  /**
   * 手持ちポケモン
   */
  _onHandPokemons: OwnPokemon[] = [];

  /**
   * 持っているバッジ
   */
  private _onHandGymBadge = [];

  private constructor(name: string, gender: '男' | '女') {
    super(name, gender);
  }

  getHeroData(): THeroStatus {
    return {
      name: this._name,
      gender: this._gender,
      money: this._pocketMoney + '円',
      onHandPokemons: this._onHandPokemons.length !== 0
                        ? this._onHandPokemons
                        : 'まだポケモンがいません',
      onHandGymBadge: this._onHandGymBadge.length !== 0
                        ? this._onHandGymBadge
                        : 'まだバッジを持っていません'
    }
  }

  getNewPokemon(pokemon: OwnPokemon) {
    if (this._onHandPokemons.length < 6) {
      this._onHandPokemons.push(pokemon);
    }
    this._haveAllPokemons.push(pokemon);
  }

  public static getInstance(name?: string, gender?: '男' | '女'): Hero {
    if (!this._instance && name && gender) {
      this._instance = new Hero(name, gender);
    }
    return this._instance;
  }
}
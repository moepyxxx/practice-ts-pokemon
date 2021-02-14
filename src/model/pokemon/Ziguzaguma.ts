import { Pokemon } from './Pokemon';
import { Group } from '../group/Group';
import { Move } from '../move/Move';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { MOVE_CLASS_LIST } from '../classdata/moveClassDatas';

export class Ziguzaguma extends Pokemon {

  /**
   * ポケモン名称
   */
  protected readonly _name: string = 'ジグザグマ';

  /**
   * ポケモン種別（●●ポケモン）
   */
  protected readonly _pokemonType: string = 'まめだぬきポケモン';

  /**
   * タイプ
   */
  protected readonly _groups: Group[] = [ GROUP_CLASS_LIST.normal ];

  /**
   * おぼえられるわざ一覧
   */
  protected readonly _moveListToRequest: {
    lebel: number;
    move: Move
  }[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.taiatari},
    {lebel:1, move: MOVE_CLASS_LIST.nakigoe}
  ];

  /**
   * 種族値
   */
  _basicPokemonStatus = {
    hp: 38,
    attack: 30,
    protected: 41,
    SPattack: 30,
    SPprotected: 41,
    rapidity: 60
  };
}
import { Pokemon } from './Pokemon';
import { Group } from '../group/Group';
import { Move } from '../move/Move';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { MOVE_CLASS_LIST } from '../classdata/moveClassDatas';

export class Pochiena extends Pokemon {

  /**
   * ポケモン名称
   */
  protected readonly _name: string = 'ポチエナ';

  /**
   * ポケモン種別（●●ポケモン）
   */
  protected readonly _pokemonType: string = 'かみつきポケモン';

  /**
   * タイプ
   */
  protected readonly _groups: Group[] = [ GROUP_CLASS_LIST.aku ];

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
    hp: 35,
    attack: 55,
    protected: 35,
    SPattack: 30,
    SPprotected: 30,
    rapidity: 35
  };
}
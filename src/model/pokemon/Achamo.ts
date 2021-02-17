import { Pokemon } from './Pokemon';
import { Group } from '../group/Group';
import { Move } from '../move/Move';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { MOVE_CLASS_LIST } from '../classdata/moveClassDatas';

export class Achamo extends Pokemon {

  /**
   * ポケモン名称
   */
  protected readonly _name: string = 'アチャモ';

  /**
   * ポケモン種別（●●ポケモン）
   */
  protected readonly _pokemonType: string = 'ひよこポケモン';

  /**
   * タイプ
   */
  protected readonly _groups: Group[] = [ GROUP_CLASS_LIST.honoo ];

  /**
   * おぼえられるわざ一覧
   */
  protected readonly _moveListToRequest: {
    lebel: number;
    move: Move
  }[] = [
    // {lebel: 1, move: MOVE_CLASS_LIST.hikkaku},
    {lebel:1, move: MOVE_CLASS_LIST.nakigoe},
    // {lebel:3, move: MOVE_CLASS_LIST.hinoko},
    // {lebel:6, move: 'でんこうせっか'},
    // {lebel:9, move: 'ニトロチャージ'},
    // {lebel:12, move: 'みきり'},
    // {lebel:15, move: 'すなかけ'},
    // {lebel:18, move: 'つばめがえし'},
    // {lebel:21, move: 'きりさく'},
    // {lebel:24, move: 'とびはねる'},
    // {lebel:27, move: 'きあいだめ'},
    // {lebel:30, move: 'かえんほうしゃ'},
    // {lebel:33, move: 'フェザーダンス'},
    // {lebel:36, move: 'きしかいせい'},
    // {lebel:39, move: 'フレアドライブ'}
  ];

  /**
   * 種族値
   */
  _basicPokemonStatus = {
    hp: 45,
    attack: 60,
    protected: 40,
    SPattack: 70,
    SPprotected: 50,
    rapidity: 45
  };
}
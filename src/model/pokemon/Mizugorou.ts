import { Pokemon } from './Pokemon';
import { Group } from '../group/Group';
import { Move } from '../move/Move';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { MOVE_CLASS_LIST } from '../classdata/moveClassDatas';

export class Mizugorou extends Pokemon {

  /**
   * ポケモン名称
   */
  protected readonly _name: string = 'ミズゴロウ';

  /**
   * ポケモン種別（●●ポケモン）
   */
  protected readonly _pokemonType: string = 'ぬまうおポケモン';

  /**
   * タイプ
   */
  protected readonly _groups: Group[] = [ GROUP_CLASS_LIST.mizu ];

  /**
   * おぼえられるわざ一覧
   */
  protected readonly _moveListToRequest: {
    lebel: number;
    move: Move
  }[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.taiatari},
    {lebel:1, move: MOVE_CLASS_LIST.nakigoe},
    {lebel:3, move: MOVE_CLASS_LIST.mizudeppou},
    {lebel:3, move: MOVE_CLASS_LIST.denjiha}
    // {lebel:6, move: 'いわくだき'},
    // {lebel:9, move: 'いわおとし'},
    // {lebel:12, move: 'まもる'},
    // {lebel:15, move: 'ちょうおんぱ'},
    // {lebel:18, move: 'みずのはどう'},
    // {lebel:21, move: 'いわなだれ'},
    // {lebel:24, move: 'とっしん'},
    // {lebel:27, move: 'ドわすれ'},
    // {lebel:30, move: 'なみのり'},
    // {lebel:33, move: 'いやなおと'},
    // {lebel:36, move: 'がむしゃら'},
    // {lebel:39, move: 'ハイドロポンプ'}
  ];

  /**
   * 種族値
   */
  _basicPokemonStatus = {
    hp: 50,
    attack: 70,
    protected: 50,
    SPattack: 50,
    SPprotected: 50,
    rapidity: 40
  };
}
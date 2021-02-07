import { Pokemon } from './Pokemon';
import { Group } from '../group/Group';
import { Move } from '../move/Move';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { MOVE_CLASS_LIST } from '../classdata/moveClassDatas';

export class Kimori extends Pokemon {

  /**
   * ポケモン名称
   */
  protected readonly _name: string = 'キモリ';

  /**
   * ポケモン種別（●●ポケモン）
   */
  protected readonly _pokemonType: string = 'もりトカゲポケモン';

  /**
   * タイプ
   */
  protected readonly _groups: Group[] = [ GROUP_CLASS_LIST.kusa ];

  /**
   * おぼえられるわざ一覧
   */
  protected readonly _moveListToRequest: {
    lebel: number;
    move: Move
  }[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.hataku},
    {lebel:1, move: MOVE_CLASS_LIST.niramitsukeru},
    {lebel:3, move: MOVE_CLASS_LIST.konoha},
    // {lebel:6, move: 'でんこうせっか'},
    // {lebel:9, move: 'メガドレイン'},
    // {lebel:12, move: 'みきり'},
    // {lebel:15, move: 'ファストガード'},
    // {lebel:18, move: 'だめおし'},
    // {lebel:21, move: 'ギガドレイン'},
    // {lebel:24, move: 'たたきつける'},
    // {lebel:27, move: 'かげぶんしん'},
    // {lebel:30, move: 'エナジーボール'},
    // {lebel:33, move: 'いやなおと'},
    // {lebel:36, move: 'がむしゃら'},
    // {lebel:39, move: 'リーフストーム'}
  ];
}
import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Juputoru } from '../Pokemon/Juputoru';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Kimori extends Pokemon {
  _name: string = 'キモリ';
  _child = null;
  _groups: Group[] = [
    GROUP_CLASS_LIST.kusa
  ];
  _evolveLebel: number = 16;
  _moveListToRequest: IMove[] = [
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
  _initialLebel = [5];
  _basicCategoryStatus = {
    hp: 40,
    attack: 45,
    protected: 35,
    SPattack: 65,
    SPprotected: 55,
    rapidity: 70
  };

  constructor(_beforeEvole: Pokemon | null, _nickname?: string) {
    super(_beforeEvole, _nickname);

    this._beforeEvole = null;

    this._lebel = randomSingleInArray<number>(this._initialLebel);
    this._exPoint = Math.pow(this.lebel, 3);
    this._moveList = this.getInitialMoveList(this.lebel);

    this._basicStatus = this.calculateBasicStatus();
  }

  protected evolve(): Pokemon {
    return this instanceof Pokemon ? new Juputoru(this): this;
  }

}

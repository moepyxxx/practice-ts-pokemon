import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Jukain } from '../Pokemon/Jukain';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Juputoru extends Pokemon {
  _name: string = 'ジュプトル';
  _child = 'キモリ';
  _groups: Group[] = [
    GROUP_CLASS_LIST.kusa
  ];
  _evolveLebel: number = 36;
  _moveListToRequest: IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.renzokugiri},
    {lebel: 1, move: MOVE_CLASS_LIST.mineuchi},
    // {lebel: 1, move: 'シザークロス'},
    // {lebel: 1, move: 'エナジーボール'},
    // {lebel: 1, move: 'はたく'},
    // {lebel: 1, move: 'にらみつける'},
    // {lebel: 1, move: 'このは'},
    // {lebel: 1, move: 'でんこうせっか'},
    // {lebel: 9, move: 'メガドレイン'},
    // {lebel: 12, move: 'みきり'},
    // {lebel: 15, move: 'ファストガード'},
    // {lebel: 20, move: 'だめおし'},
    // {lebel: 25, move: 'ギガドレイン'},
    // {lebel: 30, move: 'たたきつける'},
    // {lebel: 35, move: 'かげぶんしん'},
    // {lebel: 45, move: 'いやなおと'},
    // {lebel: 50, move: 'がむしゃら'},
    // {lebel: 55, move: 'リーフストーム'}
  ];
  _initialLebel = [16];
  _basicCategoryStatus = {
    hp: 50,
    attack: 65,
    protected: 45,
    SPattack: 85,
    SPprotected: 65,
    rapidity: 95
  };
  _lebel: number;
  _exPoint: number;
  _moveList: IMove[];

  constructor(_beforeEvole: Pokemon | null, _nickname?: string) {
    super(_beforeEvole, _nickname);

    if (this._beforeEvole) {
      this.render(`${this.name}に進化した。`);

      this._nickname = this._beforeEvole.nickname;
      this._basicEffortStatus = this._beforeEvole.basicEffortStatus;
      this._basicIndividualStatus = this._beforeEvole.basicIndividualStatus;

      this._lebel = this._beforeEvole.lebel;
      this._exPoint = this._beforeEvole.exPoint;
      this._moveList = this._beforeEvole.moveList;
    } else {
      this._lebel = randomSingleInArray<number>(this._initialLebel);
      this._exPoint = Math.pow(this.lebel, 3);
      this._moveList = this.getInitialMoveList(this.lebel);
    }

    this._basicStatus = this.calculateBasicStatus();
  }

  protected evolve(): Pokemon {
    return this instanceof Pokemon ? new Jukain(this): this;
  }

}

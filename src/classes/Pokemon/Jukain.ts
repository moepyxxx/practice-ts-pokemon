import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Juputoru } from './Juputoru';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Jukain extends Pokemon {
  _name: string = 'ジュカイン';
  _child = 'ジュプトル';
  _groups: Group[] = [
    GROUP_CLASS_LIST.kusa
  ];
  _evolveLebel: number = 36;
  _moveListToRequest: IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.hikkaku},
    {lebel: 1, move: MOVE_CLASS_LIST.renzokugiri},
    // {lebel: 1, move: 'みねうち'},
    // {lebel: 1, move: 'シザークロス'},
    // {lebel: 1, move: 'エナジーボール'},
    // {lebel: 1, move: 'はたく'},
    // {lebel: 1, move: 'にらみつける'},
    // {lebel: 1, move: 'このは'},
    // {lebel: 1, move: 'でんこうせっか'},
    // {lebel: 5, move: 'メガドレイン'},
    // {lebel: 12, move: 'みきり'},
    // {lebel: 15, move: 'ファストガード'},
    // {lebel: 20, move: 'だめおし'},
    // {lebel: 25, move: 'ギガドレイン'},
    // {lebel: 30, move: 'たたきつける'},
    // {lebel: 35, move: 'かげぶんしん'},
    // {lebel: 42, move: 'リーフブレード'},
    // {lebel: 49, move: 'いやなおと'},
    // {lebel: 56, move: 'がむしゃら'},
    // {lebel: 63, move: 'リーフストーム'}
  ];
  _initialLebel = [36];
  _basicCategoryStatus = {
    hp: 70,
    attack: 110,
    protected: 75,
    SPattack: 145,
    SPprotected: 85,
    rapidity: 145
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
    return this instanceof Pokemon ? new Juputoru(this): this;
  }

}

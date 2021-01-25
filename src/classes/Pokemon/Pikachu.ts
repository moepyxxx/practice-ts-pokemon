import { IMove } from '../../utils/interface.general';
import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { randomSingleInArray } from '../../utils/functions';
import { Group } from '../Group';
import { Pokemon } from '../Pokemon';
import { Raichu } from '../Pokemon/Raichu';

export class Pikachu extends Pokemon {
  _name: string = 'ピカチュウ';
  _groups: Group[] = [
    GROUP_CLASS_LIST.denki
  ];
  _child = null;
  _evolveLebel = null;
  _moveListToRequest: IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.denkiShock},
    {lebel:1, move: MOVE_CLASS_LIST.nakigoe},
    // {lebel:9, move: 'でんじは'},
    // {lebel:16, move: 'でんこうせっか'},
    // {lebel:26, move: 'スピードスター'},
    // {lebel:33, move: 'じゅうまんボルト'},
    // {lebel:43, move: 'かみなり'}
  ];
  _initialLebel = [5, 6, 7];
  _basicCategoryStatus = {
    hp: 35,
    attack: 55,
    protected: 40,
    SPattack: 50,
    SPprotected: 50,
    rapidity: 90
  };
  _lebel: number;
  _exPoint: number;
  _moveList: IMove[];

  constructor(_beforeEvole: Pokemon | null, _nickname?: string) {
    super(_beforeEvole, _nickname);

    this._beforeEvole = null;

    this._lebel = randomSingleInArray<number>(this._initialLebel);
    this._exPoint = Math.pow(this.lebel, 3);
    this._moveList = this.getInitialMoveList(this.lebel);

    this._basicStatus = this.calculateBasicStatus();

  }

  protected evolve(): Pokemon {
    return this instanceof Pokemon ? new Raichu(this): this;
  }

}

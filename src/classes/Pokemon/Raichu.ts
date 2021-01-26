import { IMove } from '../../utils/interface.general';
import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Raichu extends Pokemon {
  _name: string = 'ライチュウ';
  _child: string = 'ピカチュウ';
  _groups: Group[] = [
    GROUP_CLASS_LIST.denki
  ];
  _evolveLebel = null;
  _moveListToRequest: IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.denkiShock},
    {lebel:1, move: MOVE_CLASS_LIST.nakigoe},
    // {lebel:1, move: 'でんじは'},
    // {lebel:16, move: 'でんこうせっか'},
    // {lebel:36, move: 'スピードスター'},
    // {lebel:43, move: 'じゅうまんボルト'},
    // {lebel:53, move: 'かみなり'}
  ];
  _initialLebel = [55, 56, 57];
  _basicCategoryStatus = {
    hp: 60,
    attack: 90,
    protected: 55,
    SPattack: 90,
    SPprotected: 80,
    rapidity: 110
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
      this._statusAilment = [this._beforeEvole.statusAilment];
    } else {
      this._lebel = randomSingleInArray<number>(this._initialLebel);
      this._exPoint = Math.pow(this.lebel, 3);
      this._moveList = this.getInitialMoveList(this.lebel);
    }

    this._basicStatus = this.calculateBasicStatus();
  }

  evolve() {
    return this;
  }

}

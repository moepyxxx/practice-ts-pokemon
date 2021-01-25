import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Raguraji } from '../Pokemon/Raguraji';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Numakuro extends Pokemon {
  _name: string = 'ヌマクロー';
  _child = 'ミズゴロウ';
  _groups: Group[] = [
    GROUP_CLASS_LIST.mizu,
    GROUP_CLASS_LIST.jimen
  ];
  _evolveLebel: number = 36;
  _moveListToRequest: IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.madShot},
    {lebel: 1, move: MOVE_CLASS_LIST.jishin},
    // {lebel: 1, move: 'なみのり'},
    // {lebel: 1, move: 'たいあたり'},
    // {lebel: 1, move: 'なきごえ'},
    // {lebel: 1, move: 'みずでっぽう'},
    // {lebel: 1, move: 'いわくだき'},
    // {lebel: 9, move: 'いわおとし'},
    // {lebel: 12, move: 'まもる'},
    // {lebel: 15, move: 'ちょうおんぱ'},
    // {lebel: 20, move: 'みずのはどう'},
    // {lebel: 25, move: 'いわなだれ'},
    // {lebel: 30, move: 'とっしん'},
    // {lebel: 35, move: 'ドわすれ'},
    // {lebel: 40, move: 'だくりゅう'},
    // {lebel: 45, move: 'いやなおと'},
    // {lebel: 50, move: 'がむしゃら'},
    // {lebel: 55, move: 'ハイドロポンプ'}
  ];
  _initialLebel = [16];
  _basicCategoryStatus = {
    hp: 70,
    attack: 85,
    protected: 70,
    SPattack: 60,
    SPprotected: 70,
    rapidity: 50
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
    return this instanceof Pokemon ? new Raguraji(this): this;
  }

}

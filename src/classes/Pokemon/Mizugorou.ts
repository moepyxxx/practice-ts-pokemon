import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Numakuro } from '../Pokemon/Numakuro';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Mizugorou extends Pokemon {
  _name: string = 'ミズゴロウ';
  _child = null;
  _groups: Group[] = [
    GROUP_CLASS_LIST.mizu
  ];
  _evolveLebel: number = 16;
  _moveListToRequest: IMove[] = [
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
  _initialLebel = [5];
  _basicCategoryStatus = {
    hp: 50,
    attack: 70,
    protected: 50,
    SPattack: 50,
    SPprotected: 50,
    rapidity: 40
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
    return this instanceof Pokemon ? new Numakuro(this): this;
  }

}

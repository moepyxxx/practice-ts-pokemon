import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Wakasyamo } from '../Pokemon/Wakasyamo';
import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas'
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Achamo extends Pokemon {
  _name: string = 'アチャモ';
  _child = null;
  _groups: Group[] = [
    GROUP_CLASS_LIST.honoo
  ];
  _evolveLebel: number = 16;
  _moveListToRequest:IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.hikkaku},
    {lebel:1, move: MOVE_CLASS_LIST.nakigoe},
    {lebel:3, move: MOVE_CLASS_LIST.hinoko},
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
  _initialLebel = [5];
  _basicCategoryStatus = {
    hp: 45,
    attack: 60,
    protected: 40,
    SPattack: 70,
    SPprotected: 50,
    rapidity: 45
  };
  _remainingHp: number;

  constructor(_beforeEvole: Pokemon | null, _nickname?: string) {
    super(_beforeEvole, _nickname);

    this._beforeEvole = null;

    this._lebel = randomSingleInArray<number>(this._initialLebel);
    this._exPoint = Math.pow(this.lebel, 3);
    this._moveList = this.getInitialMoveList(this.lebel);

    this._basicStatus = this.calculateBasicStatus();
    this._remainingHp = this.basicStatus.hp;
  }

  protected evolve(): Pokemon {
    return this instanceof Pokemon ? new Wakasyamo(this): this;
  }

}

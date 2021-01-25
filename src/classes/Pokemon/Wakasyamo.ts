import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { Basyamo } from '../Pokemon/Basyamo';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Wakasyamo extends Pokemon {
  _name: string = 'ワカシャモ';
  _child = 'アチャモ';
  _groups: Group[] = [
    GROUP_CLASS_LIST.honoo,
    GROUP_CLASS_LIST.kakutou
  ];
  _evolveLebel: number = 36;
  _moveListToRequest: IMove[] = [
    // {lebel: 1, move: 'にどげり'},
    // {lebel: 1, move: 'かえんほうしゃ'},
    // {lebel: 1, move: 'フェザーダンス'},
    // {lebel: 1, move: 'ひっかく'},
    // {lebel: 1, move: 'なきごえ'},
    // {lebel: 1, move: 'ひのこ'},
    // {lebel: 1, move: 'でんこうせっか'},
    // {lebel: 9, move: 'ニトロチャージ'},
    // {lebel: 12, move: 'みきり'},
    // {lebel: 15, move: 'すなかけ'},
    // {lebel: 20, move: 'つばめがえし'},
    // {lebel: 25, move: 'きりさく'},
    // {lebel: 30, move: 'とびはねる'},
    // {lebel: 35, move: 'きあいだめ'},
    // {lebel: 40, move: 'ブレイズキック'},
    // {lebel: 45, move: 'ビルドアップ'},
    // {lebel: 50, move: 'きしかいせい'},
    // {lebel: 55, move: 'フレアドライブ'}
  ];
  _initialLebel = [16];
  _basicCategoryStatus = {
    hp: 60,
    attack: 85,
    protected: 60,
    SPattack: 85,
    SPprotected: 60,
    rapidity: 55
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
    return this instanceof Pokemon ? new Basyamo(this): this;
  }

}

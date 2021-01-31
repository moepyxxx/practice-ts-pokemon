import { MOVE_CLASS_LIST } from '../../utils/datas/moveClassDatas';
import { IMove } from '../../utils/interface.general';
import { randomSingleInArray } from '../../utils/functions';
import { Pokemon } from '../Pokemon';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { Group } from '../Group';

export class Raguraji extends Pokemon {
  _name: string = 'ラグラージ';
  _child = 'ヌマクロー';
  _groups: Group[] = [
    GROUP_CLASS_LIST.mizu,
    GROUP_CLASS_LIST.jimen
  ];
  _evolveLebel: number = 36;
  _moveListToRequest: IMove[] = [
    {lebel: 1, move: MOVE_CLASS_LIST.madShot},
    {lebel: 1, move: MOVE_CLASS_LIST.armHammer},
  //   {lebel: 1, move: 'じしん'},
  //   {lebel: 1, move: 'なみのり'},
  //   {lebel: 1, move: 'たいあたり'},
  //   {lebel: 1, move: 'なきごえ'},
  //   {lebel: 1, move: 'みずでっぽう'},
  //   {lebel: 1, move: 'いわくだき'},
  //   {lebel: 9, move: 'いわおとし'},
  //   {lebel: 12, move: 'まもる'},
  //   {lebel: 15, move: 'ちょうおんぱ'},
  //   {lebel: 20, move: 'みずのはどう'},
  //   {lebel: 25, move: 'いわなだれ'},
  //   {lebel: 30, move: 'とっしん'},
  //   {lebel: 35, move: 'ドわすれ'},
  //   {lebel: 42, move: 'だくりゅう'},
  //   {lebel: 49, move: 'いやなおと'},
  //   {lebel: 56, move: 'がむしゃら'},
  //   {lebel: 63, move: 'ハイドロポンプ'}
  ];
  _initialLebel = [36];
  _basicCategoryStatus = {
    hp: 100,
    attack: 110,
    protected: 90,
    SPattack: 85,
    SPprotected: 90,
    rapidity: 60
  };
  _remainingHp: number;
  
  constructor(_beforeEvole: Pokemon | null, _nickname?: string) {
    super(_beforeEvole, _nickname);

    if (this._beforeEvole) {
      this.render(`${this.name}に進化した。`);
      this.takeOverPokemonData(this._beforeEvole);
    } else {
      this._lebel = randomSingleInArray<number>(this._initialLebel);
      this._exPoint = Math.pow(this.lebel, 3);
      this._moveList = this.getInitialMoveList(this.lebel);
    }

    this._basicStatus = this.calculateBasicStatus();
    this._remainingHp = this.basicStatus.hp;
  }

  protected evolve(): Pokemon {
    return this instanceof Pokemon ? new Raguraji(this): this;
  }

}

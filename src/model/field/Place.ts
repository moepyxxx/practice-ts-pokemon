import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';

export abstract class Place {
  /**
   * フィールド名
   */
  _name: string;

  /**
   * 登場する人物
   */
  _humans?: (Ordinary | Trainer)[];


 /**
  * 登場するアイテム
  */
//  items?:{ item: Item, isHide: false }[];

  constructor(name: string, humans: (Ordinary | Trainer)[]) {
    this._name = name;
    this._humans = humans;
  }

  /**
   * Humansの追加・削除
   * イベントで変わるため
   */
  addHumanToPlace(addHuman: Ordinary | Trainer) {
    this._humans?.push(addHuman);
  }

  removeHumanFromPlace(removeHuman: Ordinary | Trainer) {
    const index = this._humans?.findIndex( human => human.name === removeHuman.name);
    if (index) {
      this._humans?.splice(index, 1);
    }
  }

}

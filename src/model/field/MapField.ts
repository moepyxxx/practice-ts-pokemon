import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { Place } from '../field/Place';

export class MapField {
  /**
   * フィールド名
   */
 private readonly _name: string;

  /**
   * フィールドを構成する場所要素
   */
  private readonly _place: Place[];

  /**
  * 近くのフィールド
  */
 private _nearField: MapField[];

 /**
  * 登場する人物
  */
 private readonly _humans?: (Ordinary | Trainer)[];

 constructor(name: string, place: Place[], nearField?: MapField[], humans?: (Ordinary | Trainer)[]) {
   this._name = name;
   this._place = place;
   this._nearField = nearField ? this._nearField : [];
   this._humans = humans? this._humans : [];
 }

 get name() {
   return this._name;
 }

 get place() {
   return this._place;
 }

 get nearField() {
   return this._nearField;
 }

 set nearField(nearField) {
   this._nearField = nearField;
 }

 get humans() {
   return this._humans;
 }

}

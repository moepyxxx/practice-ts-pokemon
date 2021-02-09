import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { Place } from '../field/Place';

export class MapField {
  /**
   * フィールド名
   */
 _name: string;

  /**
   * フィールドを構成する場所要素
   */
 _place: Place[];

 /**
  * 登場する人物
  */
 _humans?: (Ordinary | Trainer)[];

}

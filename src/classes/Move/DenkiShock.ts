import { Move } from '../Move';
import { Group } from '../Group';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';

export class DenkiShock extends Move {

  /**
   * 名前
   */
  _name = 'でんきショック';

  /**
   * 説明
   */
  _description = '10%のかくりつで相手をまひさせる。';

  /**
   * わざ種別
   */
  _species: '物理' | '特殊' | '変化' = '特殊';

  /**
   * わざタイプ
   */
  _type: Group = GROUP_CLASS_LIST.denki;

  /**
   * 威力
   */
  _power = 40;

  /**
   * 命中率
   */
  _accuracy = 100;

  /**
   * PP
   */
  _pp = 40;

  /**
   * 優先度
   */
  _priority = 0;

  /**
   * 急所に当たりやすいランク
   */
  _criticalRank = 0;
}
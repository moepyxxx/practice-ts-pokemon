import { Move } from '../Move';
import { Group } from '../Group';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';


export class Hinoko extends Move {

  /**
   * 名前
   */
  _name = 'ひのこ';

  /**
   * 説明
   */
  _description = '小さな炎を相手に発射して攻撃する。やけど状態にすることがある';

  /**
   * わざ種別
   */
  _species: '物理' | '特殊' | '変化' = '特殊';

  /**
   * わざタイプ
   */
  _type: Group = GROUP_CLASS_LIST.honoo;

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
  _pp = 25;

  /**
   * 優先度
   */
  _priority = 0;

  /**
   * 急所に当たりやすいランク
   */
  _criticalRank = 0;
}
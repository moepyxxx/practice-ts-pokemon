import { Move } from '../Move';
import { Group } from '../Group';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';


export class Hataku extends Move {

  /**
   * 名前
   */
  _name = 'はたく';

  /**
   * 説明
   */
  _description = '長いしっぽや手などを使って相手をはたいて攻撃する';

  /**
   * わざ種別
   */
  _species: '物理' | '特殊' | '変化' = '物理';

  /**
   * わざタイプ
   */
  _type: Group = GROUP_CLASS_LIST.normal;

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
  _pp = 35;

  /**
   * 優先度
   */
  _priority = 0;

  /**
   * 急所に当たりやすいランク
   */
  _criticalRank = 0;
}
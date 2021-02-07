import { Move } from './Move';
import { Group } from '../group/Group';
import { Pokemon } from '../pokemon/Pokemon';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { STATUS_AILMENT_CLASS_LIST } from '../classdata/statusAilmentDatas';

export class Konoha extends Move {

  /**
   * 名前
   */
  _name = 'このは';

  /**
   * 説明
   */
  _description = 'はっぱを相手に当てて攻撃する';

  /**
   * わざ種別
   */
  _species: '物理' | '特殊' | '変化' = '物理';

  /**
   * わざタイプ
   */
  _type: Group = GROUP_CLASS_LIST.kusa;

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
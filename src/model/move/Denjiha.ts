import { Move } from './Move';
import { Group } from '../group/Group';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { STATUS_AILMENT_CLASS_LIST } from '../classdata/statusAilmentDatas';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { ExceptPokemon } from '../pokemon/ExceptPokemon';

export class Denjiha extends Move {

  /**
   * 名前
   */
  _name = 'でんじは';

  /**
   * 説明
   */
  _description = '相手をまひ状態にする';

  /**
   * わざ種別
   */
  _species: '物理' | '特殊' | '変化' = '変化';

  /**
   * わざタイプ
   */
  _type: Group = GROUP_CLASS_LIST.denki;

  /**
   * 威力
   */
  _power = null;

  /**
   * 命中率
   */
  _accuracy = 90;

  /**
   * PP
   */
  _pp = 20;

  /**
   * 優先度
   */
  _priority = 0;

  /**
   * 急所に当たりやすいランク
   */
  _criticalRank = 0;

  getEffect(attack: OwnPokemon | ExceptPokemon, defense: OwnPokemon | ExceptPokemon) {
    return {
      target: defense,
      effect: 'statusAilment',
      status: STATUS_AILMENT_CLASS_LIST.saParalysis
    }
  }
}
import { Move } from './Move';
import { Group } from '../group/Group';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { STATUS_AILMENT_CLASS_LIST } from '../classdata/statusAilmentDatas';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { ExceptPokemon } from '../pokemon/ExceptPokemon';
import { TChangeEffext } from '../../utils/type/TChangeEffect';

export class Nakigoe extends Move {

  /**
   * 名前
   */
  _name = 'なきごえ';

  /**
   * 説明
   */
  _description = '相手のこうげきを一段下げる';

  /**
   * わざ種別
   */
  _species: '物理' | '特殊' | '変化' = '変化';

  /**
   * わざタイプ
   */
  _type: Group = GROUP_CLASS_LIST.normal;

  /**
   * 威力
   */
  _power = null;

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

  getEffect(attack: OwnPokemon | ExceptPokemon, defense: OwnPokemon | ExceptPokemon): TChangeEffext | null {
    return {
      target: defense,
      change: 'sub',
      battleRank: 'attack',
      degree: 1
    }
  }

}
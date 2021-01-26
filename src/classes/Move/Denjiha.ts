import { Move } from '../Move';
import { Group } from '../Group';
import { Pokemon } from '../Pokemon';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';
import { STATUS_AILMENT_CLASS_LIST } from '../../utils/datas/statusAilmentDatas';

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

  effects(...pokemons: Pokemon[]): string {

    const [atkPokemon, defPokemon] = pokemons;
    const resultMessage: string = defPokemon.setStatusAilment(STATUS_AILMENT_CLASS_LIST.saParalysis);
    return resultMessage;

  }
}
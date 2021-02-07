import { Move } from './Move';
import { Group } from '../group/Group';
import { Pokemon } from '../pokemon/Pokemon';
import { GROUP_CLASS_LIST } from '../classdata/groupClassDatas';
import { STATUS_AILMENT_CLASS_LIST } from '../classdata/statusAilmentDatas';

export class Niramitsukeru extends Move {

  /**
   * 名前
   */
  _name = 'にらみつける';

  /**
   * 説明
   */
  _description = '相手のぼうぎょを一段下げる';

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
  _pp = 30;

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
    const resultMessage: string = defPokemon.subBattleStatusRank('protected', 1);
    return resultMessage;

  }
}
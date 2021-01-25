import { Move } from '../Move';
import { Group } from '../Group';
import { Pokemon } from '../Pokemon';
import { GROUP_CLASS_LIST } from '../../utils/datas/groupClassDatas';


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

  effects(...pokemons: Pokemon[]): string {

    const [defPokemon] = pokemons;
    const resultMessage: string = defPokemon.subBattleStatusRank('attack', 1);
    return resultMessage;

  }
}
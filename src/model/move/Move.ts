import { TChangeEffext } from '../../utils/type/TChangeEffect';
import { Group } from '../group/Group';
import { ExceptPokemon } from '../pokemon/ExceptPokemon';
import { OwnPokemon } from '../pokemon/OwnPokemon';

export abstract class Move {

  /**
   * 名前
   */
  abstract _name: string;

  /**
   * 説明
   */
  abstract _description: string;

  /**
   * わざ種別
   */
  abstract _species: '物理' | '特殊' | '変化';

  /**
   * わざタイプ
   */
  abstract _type: Group;

  /**
   * 威力
   */
  abstract _power: number | null;

  /**
   * 命中率
   */
  abstract _accuracy: number;

  /**
   * PP
   */
  abstract _pp: number;

  /**
   * 優先度
   */
  abstract _priority: number;

  /**
   * 急所に当たりやすいランク
   */
  abstract _criticalRank: number | null;

  get name() {
    return this._name;
  }
  
  get description() {
    return this._description;
  }
  
  get species() {
    return this._species;
  }

  get type() {
    return this._type;
  }

  get power() {
    return this._power;
  }

  get accuracy() {
    return this._accuracy;
  }

  get pp() {
    return this._pp;
  }
  
  get priority() {
    return this._priority;
  }

  get criticalRank() {
    return this._criticalRank;
  }

  getEffect(attack: OwnPokemon | ExceptPokemon, defense: OwnPokemon | ExceptPokemon): TChangeEffext | null {
    return null;
  }

}
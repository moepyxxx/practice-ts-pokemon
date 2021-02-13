import { TBattleStatusRank } from '../type/TBattleStatusRank';
import { StatusAilment } from '../../model/statusAilment/StatusAilment';

export interface IPokemonBattle {
  /**
   * 残りHP
   */
  _remainingHp: number;

  /**
   * 状態異常
   */
  _statusAilment: StatusAilment;

  /**
   * バトルステータスランク
   */
  _battleStatusRank: TBattleStatusRank;
}
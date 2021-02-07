import { TBattleStatusRank } from '../type/TBattleStatusRank';

export interface IPokemonBattle {
  /**
   * 残りHP
   */
  _remainingHp: number;

  /**
   * 状態異常
   */
  _statusAilment: StatusAilment[];

  /**
   * バトルステータスランク
   */
  _battleStatusRank: TBattleStatusRank;

  /**
   * 残りHP計算
   */
  calculateRemainingHp: (effect: 'saFainting' | 'sub' | 'add' | 'reset', number: number) => number;

  /**
   * バトルステータスランクの加算・減算
   */
  addBattleStatusRank:(key: keyof TBattleStatusRank, number: number) => void;
  subBattleStatusRank:(key: keyof TBattleStatusRank, number: number) => void;

  /**
   * ランク補正値の計算
   */
  calculateBattleStatusRankCorrection: (key: keyof TBattleStatusRank) => number;

}
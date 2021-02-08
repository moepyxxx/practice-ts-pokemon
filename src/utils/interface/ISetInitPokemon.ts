import { TBasicStatus } from '../type/TBasicStatus';
import { Move } from '../../model/move/Move';

export interface ISetInitPokemon {
  /**
   * レベル
   */
  _lebel: number;

  /**
   * おぼえているわざ
   */
  _moveList: Move[];
  
  /**
   * 種族値・個体値・努力値を合わせた決定ステータス
   */
  _basicTotalStatus: TBasicStatus;

}
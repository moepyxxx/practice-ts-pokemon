import { ExceptPokemon } from "./ExceptPokemon";
import { ILebel } from '../../utils/interface/ILebel';
import { IStatus } from '../../utils/interface/IStatus';
import { IMoveList } from '../../utils/interface/IMoveList';
import { IPokemonBattle } from '../../utils/interface/IPokemonBattle';
import { TBasicStatus } from '../../utils/type/TBasicStatus';
import { TBattleStatusRank } from '../../utils/type/TBattleStatusRank';
import { Move } from '../../model/move/Move';
import { StatusAilment } from '../../model/statusAilment/StatusAilment';
import { MapField } from '../field/MapField';

export class OwnPokemon　implements ILebel, IStatus, IMoveList, IPokemonBattle {
  /**
   * ポケモン
   */
  protected _pokemon: ExceptPokemon;

  /**
   * ニックネーム
   */
  _nickname: string;

  /**
   * おぼえているわざ
   */
  _moveList: Move[];

  /**
   * レベル
   */
  _lebel: number;

  /**
   * 経験値
   */
  _exPoint: number;

  /**
   * 出会った場所
   */
  _encounter: MapField['_name'];
   
  /**
   * ステータス
   */
  _basicPokemonStatus: TBasicStatus;
  _basicIndividualStatus: TBasicStatus;
  _basicEffortStatus: TBasicStatus;
  _basicTotalStatus: TBasicStatus;

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

  constructor(pokemon: ExceptPokemon, encounterField: MapField['_name'], nickname?: string) {
    this._nickname = nickname ?? pokemon.name;
    this._encounter = encounterField;

    /** ステータス等をExceptPokemonクラスから引き継ぎ */
    this._pokemon = pokemon;
    this._lebel = pokemon.lebel;
    this._basicPokemonStatus = pokemon._basicPokemonStatus;
    this._basicIndividualStatus = pokemon._basicIndividualStatus;
    this._basicEffortStatus = pokemon._basicEffortStatus;
    this._basicTotalStatus = this.calculateBasicStatus();
    this._moveList = pokemon._moveList;
    this._remainingHp = pokemon._remainingHp;
    this._statusAilment = pokemon._statusAilment;
    this._battleStatusRank = pokemon._battleStatusRank;
    this._exPoint = Math.pow(this._lebel, 3);
  }

  get pokemon() {
    return this._pokemon;
  }

  get basicTotalStatus() {
    return this._basicTotalStatus;
  }

  /**
   * ステータスの計算
   */
  calculateBasicStatus(): TBasicStatus {
    const basicTotalStatus: TBasicStatus = {
      hp: 0,
      attack: 0,
      protected: 0,
      SPattack: 0,
      SPprotected: 0,
      rapidity: 0
    };
    for (let k of Object.keys(basicTotalStatus) as (keyof TBasicStatus)[]) {
      const common = ((this._basicPokemonStatus[k] * 2) + this._basicIndividualStatus[k] + this._basicEffortStatus[k]) * this._lebel / 100;
      basicTotalStatus[k] = k === 'hp' 
        ? Math.round(common + this._lebel + 10)
        : Math.round(common + 5)
      ;
    }
    return basicTotalStatus;
  }

  /**
   * 次のレベルまでに必要な経験値を取得
   */
  getReqLebelUpExPoint(): number {
    if (this._lebel >= 100) {
      return 0;
    }
    return (Math.pow(this._lebel + 1, 3)) - this._exPoint;
  }
  
}
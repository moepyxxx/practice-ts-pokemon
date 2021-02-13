import { Pokemon } from "../../model/pokemon/Pokemon";
import { ILebel } from '../../utils/interface/ILebel';
import { IStatus } from '../../utils/interface/IStatus';
import { IMoveList } from '../../utils/interface/IMoveList';
import { IPokemonBattle } from '../../utils/interface/IPokemonBattle';
import { TBasicStatus } from '../../utils/type/TBasicStatus';
import { TBattleStatusRank } from '../../utils/type/TBattleStatusRank';
import { Move } from '../../model/move/Move';
import { randomMultipleInArray } from '../../utils/general';
import { StatusAilment } from '../../model/statusAilment/StatusAilment';

export class ExceptPokemon implements ILebel, IStatus, IMoveList, IPokemonBattle {

  /**
   * ポケモン
   */
  protected readonly _pokemon: Pokemon;

  /**
   * おぼえているわざ
   */
  readonly _moveList: Move[];

  /**
   * レベル
   */
  readonly _lebel: number;

  /**
   * ステータス
   */
  _basicPokemonStatus: TBasicStatus;
  _basicIndividualStatus: TBasicStatus;
  _basicEffortStatus: TBasicStatus = {
    hp: 0,
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0
  };
  _basicTotalStatus: TBasicStatus;

  /**
   * 残りHP
   */
  _remainingHp: number;

  /**
   * 状態異常
   */
  _statusAilment: StatusAilment[] = [];

  /**
   * バトルステータスランク
   */
  _battleStatusRank: TBattleStatusRank = {
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0,
    critical: 0,
    accuracy: 0,
    evasion: 0
  };

  constructor(pokemon: Pokemon, lebel: number) {
    this._pokemon = pokemon;
    this._lebel = lebel;

    this._basicPokemonStatus = this._pokemon._basicPokemonStatus;
    this._basicIndividualStatus = this.setRandomBasicIndividualStatus();
    this._basicTotalStatus = this.calculateBasicStatus();

    this._remainingHp = this._basicTotalStatus.hp;

    this._moveList = this.getnitialMoveList();
  }

  get pokemon() {
    return this._pokemon;
  }

  get name() {
    return this._pokemon.name;
  }

  get lebel() {
    return this._lebel;
  }

  get moveList() {
    return this._moveList;
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
   * 個体値をランダムでセットする
   */
  setRandomBasicIndividualStatus(): TBasicStatus {
    const basicIndividualStatusTmp = {
      hp: 0,
      attack: 0,
      protected: 0,
      SPattack: 0,
      SPprotected: 0,
      rapidity: 0
    }
    for (let k of Object.keys(basicIndividualStatusTmp) as (keyof TBasicStatus)[]) {
      basicIndividualStatusTmp[k] = Math.floor(Math.random() * 32);
    }
    return basicIndividualStatusTmp;
  }

  /**
   * わざの取得
   */
  getnitialMoveList(): Move[] {
    const moveListFromCurrentLebel: Move[] = this._pokemon.moveListToRequest
      .filter(moveList => moveList.lebel <= this._lebel)
      .map(moveList => moveList.move);
    
    if (moveListFromCurrentLebel.length > 4) {
      return randomMultipleInArray<Move>(moveListFromCurrentLebel, 4);
    } else {
      return moveListFromCurrentLebel;
    }
  }
  
}
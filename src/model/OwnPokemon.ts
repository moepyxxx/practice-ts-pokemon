import { ExceptPokemon } from "../model/ExceptPokemon";
import { ILebel } from '../utils/interface/ILebel';
import { IStatus } from '../utils/interface/IStatus';
import { IMoveList } from '../utils/interface/IMoveList';
import { TBasicStatus } from '../utils/type/TBasicStatus';
import { Move } from '../model/move/Move';

export class OwnPokemon　implements ILebel, IStatus, IMoveList {
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
  _encounter: Field.name;
   
  /**
   * ステータス
   */
  _basicPokemonStatus: TBasicStatus;
  _basicIndividualStatus: TBasicStatus;
  _basicEffortStatus: TBasicStatus;
  _basicTotalStatus: TBasicStatus;

  constructor(pokemon: ExceptPokemon, encounterField: Field.name, nickname?: string) {
    this._nickname = nickname ?? pokemon.name;
    this._pokemon = pokemon;
    this._encounter = encounterField;

    /** ステータス等の引き継ぎ */
    this._lebel = this._pokemon.lebel;
    this._basicPokemonStatus = this._pokemon._basicPokemonStatus;
    this._basicIndividualStatus = this._pokemon._basicIndividualStatus;
    this._basicEffortStatus = this._pokemon._basicEffortStatus;
    this._basicTotalStatus = this.calculateBasicStatus();
    this._moveList = this._pokemon.moveList;

    this._exPoint = Math.pow(this._lebel, 3);
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
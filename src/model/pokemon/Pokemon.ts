import { TBasicStatus } from "../../utils/type/TBasicStatus";

export abstract class Pokemon {

  /**
   * ポケモン名称
   */
  protected readonly abstract _name: string;

  /**
   * ポケモン種別（●●ポケモン）
   */
  protected readonly abstract _pokemonType: string;

  /**
   * タイプ
   */
  protected readonly abstract _groups: Group[];

  /**
   * おぼえられるわざ一覧
   */
  protected readonly abstract _moveListToRequest: {
    lebel: number;
    move: Move
  }

  /**
   * 種族値
   */
  protected readonly abstract _basicPokemonStatus: TBasicStatus;

  /**
   * 個体値
   */
  protected abstract _basicIndividualStatus: TBasicStatus = {
    hp: 0,
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0
  }

  /**
   * 努力値
   */
  protected abstract _basicEffortStatus: TBasicStatus = {
    hp: 0,
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0
  }

  /* レベル・わざ・ステータスは、ExceptPokemonとOwnPokemonのインスタンス生成時に必ず

  /**
   * レベル
   */
  protected abstract _lebel: number = 0;

  /**
   * おぼえているわざ
   */
  protected readonly abstract _moveList: Move[] = [];
  
  /**
   * 種族値・個体値・努力値を合わせた決定ステータス
   */
  protected abstract _basicTotalStatus: TBasicStatus;

  /**
   * ゲッター・セッター
   */
  get name() {
    return this._name;
  }

  get lebel() {
    return this._lebel;
  }

  set lebel(lebel) {
    this._lebel = lebel;
  }

  get basicPokemonStatus() {
    return this._basicPokemonStatus;
  }

  get basicEffortStatus() {
    return this._basicEffortStatus;
  }

  set basicEffortStatus(basicEffortStatus) {
    this._basicEffortStatus = basicEffortStatus;
  }

  get basicIndividualStatus() {
    return this._basicIndividualStatus;
  }

  set basicIndividualStatus(basicIndividualStatus) {
    this._basicIndividualStatus = basicIndividualStatus;
  }

  get basicTotalStatus() {
    return this._basicTotalStatus;
  }

  set basicTotalStatus(basicTotalStatus) {
    this._basicTotalStatus = basicTotalStatus;
  }

  get groups() {
    return this._groups;
  }


  /**
   * ステータスを計算し、_basicTotalStatusプロパティへ格納
   * @param _basicPokemonStatus 種族値
   * @param _basicIndividualStatus 個体値
   * @param _basicEffortStatus 努力値
   */
  calculateBasicStatus(_basicPokemonStatus: TBasicStatus, _basicIndividualStatus: TBasicStatus, _basicEffortStatus: TBasicStatus): void {
    for (let k of Object.keys(this._basicTotalStatus) as (keyof TBasicStatus)[]) {
      const common = ((_basicPokemonStatus[k] * 2) + _basicIndividualStatus[k] + _basicEffortStatus[k]) * this._lebel / 100;
      this._basicTotalStatus[k] = k === 'hp' 
        ? Math.round(common + this._lebel + 10)
        : Math.round(common + 5)
      ;
    }
  }
}
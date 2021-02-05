import { IBasicStatus } from "../../utils/interfaces/IbasicStatus";

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
   * 種族値
   */
  protected readonly abstract _basicPokemonStatus: IBasicStatus;

  /**
   * 個体値
   */
  protected abstract _basicIndividualStatus: IBasicStatus;

  /**
   * 努力値
   */
  protected abstract _basicEffortStatus: IBasicStatus;

  /**
   * 種族値・個体値・努力値を合わせた決定ステータス
   */
  protected abstract _basicTotalStatus: IBasicStatus;

  /**
   * レベル
   */
  protected abstract _lebel: number;

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
  calculateBasicStatus(_basicPokemonStatus: IBasicStatus, _basicIndividualStatus: IBasicStatus, _basicEffortStatus: IBasicStatus): void {
    for (let k of Object.keys(this._basicTotalStatus) as (keyof IBasicStatus)[]) {
      const common = ((_basicPokemonStatus[k] * 2) + _basicIndividualStatus[k] + _basicEffortStatus[k]) * this._lebel / 100;
      this._basicTotalStatus[k] = k === 'hp' 
        ? Math.round(common + this._lebel + 10)
        : Math.round(common + 5)
      ;
    }
  }
}
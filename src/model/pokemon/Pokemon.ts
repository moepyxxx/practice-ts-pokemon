import { Group } from '../group/Group';
import { Move } from '../move/Move';

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
  }[];

  /**
   * ゲッター・セッター
   */
  get name() {
    return this._name;
  }

  get groups() {
    return this._groups;
  }

  get pokemonType() {
    return this._pokemonType;
  }

  get moveListToRequest() {
    return this._moveListToRequest;
  }
}
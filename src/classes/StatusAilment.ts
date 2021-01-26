import { Pokemon } from './Pokemon';

export abstract class StatusAilment {

  /**
   * 名前
   */
  protected abstract _name: string;

  /**
   * 状態異常になった時のメッセージ
   */
  protected abstract _sickedMessage: string;

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected abstract _alreadySickedMessage: string;

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected abstract _sickedTurnMessage: string;

  get name() {
    return this._name;
  }

  /**
   * 状態異常になった時、それぞれメッセージを返す処理
   */
  getSickedMessage(pokemon: Pokemon, msgGroup: 'sicked' | 'already' | 'turn') {
    switch(msgGroup) {
      case 'sicked':
        return `${pokemon.name}は${this._sickedMessage}`;
      case 'already':
        return `${pokemon.name}は${this._alreadySickedMessage}`;
      case 'turn':
        return `${pokemon.name}は${this._sickedTurnMessage}`;
    }
  }
}
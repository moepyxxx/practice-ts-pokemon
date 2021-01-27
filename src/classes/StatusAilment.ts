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

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected abstract _sickedRecoceryMessage: string;

  get name() {
    return this._name;
  }

  /**
   * 状態異常になった時、それぞれメッセージを返す処理
   */
  getSickedMessage(pokemon: Pokemon, msgGroup: 'sicked' | 'already' | 'turn' | 'recovery') {
    let message;
    switch(msgGroup) {
      case 'sicked':
        message = this._sickedMessage;
        break;
      case 'already':
        message = this._alreadySickedMessage;
        break;
      case 'turn':
        message = this._sickedTurnMessage;
        break;
      case 'recovery':
        message = this._sickedRecoceryMessage;
        break;
    }
    return `${pokemon.name}は${message}`;
  }
}
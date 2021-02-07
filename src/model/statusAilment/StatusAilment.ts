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

}
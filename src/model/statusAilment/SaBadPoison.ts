import { StatusAilment } from './StatusAilment';

export class SaBadPoison extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'もうどく';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'もうどくをあびた';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'すでにもうどくにおかされている';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'もうどくのダメージをうけている';

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected _sickedRecoceryMessage = 'どくがきれいさっぱりなくなった';

}
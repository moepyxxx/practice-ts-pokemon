import { StatusAilment } from '../StatusAilment';

export class SaPoison extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'どく';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'どくをあびた';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'すでにどくにおかされている';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'どくのダメージをうけている';

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected _sickedRecoceryMessage = 'どくがきれいさっぱりなくなった';

}
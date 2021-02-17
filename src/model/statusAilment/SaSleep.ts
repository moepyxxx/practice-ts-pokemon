import { StatusAilment } from './StatusAilment';

export class SaSleep extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'ねむり';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'ねむってしまった';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'すでにねむっている';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'ぐうぐうねむっている';

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected _sickedRecoceryMessage = 'めをさました';

}
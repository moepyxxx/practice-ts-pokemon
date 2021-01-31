import { StatusAilment } from '../StatusAilment';

export class SaFainting extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'ひんし';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'たおれた';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'ひんしでうごけない';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'ひんしでうごけない';

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected _sickedRecoceryMessage = 'ひんしから回復した';

}
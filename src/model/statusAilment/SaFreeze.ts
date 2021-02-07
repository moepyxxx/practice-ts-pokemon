import { StatusAilment } from './StatusAilment';

export class SaFreeze extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'こおり';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'こおりづけになった';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'すでにこおっている';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'こおってしまってうごけない';

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected _sickedRecoceryMessage = 'こおりがとけた';

}
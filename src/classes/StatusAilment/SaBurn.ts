import { StatusAilment } from '../StatusAilment';

export class SaBurn extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'やけど';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'やけどをおった';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'すでにやけどしている';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'やけどのダメージを受けている';

  /**
   * 状態異常が回復したときのメッセージ
   */
  protected _sickedRecoceryMessage = 'やけどがなおった';

}
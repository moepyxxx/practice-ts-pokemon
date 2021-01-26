import { StatusAilment } from '../StatusAilment';

export class SaParalysis extends StatusAilment {

  /**
   * 名前
   */
  protected _name: string = 'まひ';

  /**
   * 状態異常になった時のメッセージ
   */
  protected _sickedMessage: string = 'まひしてわざが出にくくなった';

  /**
   * すでに状態異常だったときのメッセージ
   */
  protected _alreadySickedMessage: string = 'すでにまひしている';

  /**
   * 状態異常のままターンになったときのメッセージ
   */
  protected _sickedTurnMessage: string = 'からだがしびれてうごない';

}
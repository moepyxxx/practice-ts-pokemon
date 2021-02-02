import { GROUP_KEYTYPE } from '../utils/datas/groupClassDatas';

export abstract class Group {

  /**
   * 正式名称
   */
   protected abstract _name: string;


  /**
   * キータイプ
   */
  protected abstract _keyType: GROUP_KEYTYPE;

  /**
   * 攻撃：こうかばつぐん
   */
  protected abstract _excellent: GROUP_KEYTYPE[];

  /**
   * 攻撃：こうかいまひとつ
   */
  protected abstract _notVery: GROUP_KEYTYPE[];

  /**
   * 攻撃：こうかがない
   */
  protected abstract _doesntAffext: GROUP_KEYTYPE[];

  get name() {
    return this._name;
  }

  get keyType() {
    return this._keyType;
  }

  get excellent() {
    return this._excellent;
  }

  get notVery() {
    return this._notVery;
  }
  
  get doesntAffext() {
    return this._doesntAffext;
  }

}
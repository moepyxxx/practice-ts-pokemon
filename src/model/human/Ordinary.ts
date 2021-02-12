import { Human } from './Human';
import { ITalk } from '../../utils/interface/ITalk';
import { TALK_KEY_DATA } from '../keyData/talkKeyData';

export class Ordinary extends Human implements ITalk {

  /**
   * データがわりのキーを設定
   */
  _talkKey: string;

  constructor(name: string, gender: '男' | '女', talkKey?: string) {
    super(name, gender);

    if (talkKey) {
      this._talkKey = talkKey;
    }
  }

  /**
   * 話す
   */
  talk(talkKey?: string) {
    const key = talkKey ? talkKey : this._talkKey;
    if (talkKey) {
      return `${this._name}：${TALK_KEY_DATA[talkKey]}`;
    }
  }
}
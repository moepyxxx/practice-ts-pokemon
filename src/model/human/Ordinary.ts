import { Human } from './Human';
import { ITalk } from '../../utils/interface/ITalk';

export class Ordinary extends Human implements ITalk {

  constructor(name: string, gender: '男' | '女') {
    super(name, gender);
  }

  /**
   * 話す
   */
  talk() {
    return;
  }
}
import { Group } from './Group';
import { GROUP_KEYTYPE } from '../classdata/groupClassDatas';

export class Goast extends Group {
  
  _name = 'ゴースト';
  _keyType: GROUP_KEYTYPE = 'goast';
  _excellent: GROUP_KEYTYPE[] = ['esper', 'goast'];
  _notVery: GROUP_KEYTYPE[] = ['aku'];
  _doesntAffext: GROUP_KEYTYPE[] = ['normal'];
}
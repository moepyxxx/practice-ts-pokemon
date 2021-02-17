import { Group } from './Group';
import { GROUP_KEYTYPE } from '../classdata/groupClassDatas';

export class Normal extends Group {
  
  _name = 'ノーマル';
  _keyType: GROUP_KEYTYPE = 'normal';
  _excellent: GROUP_KEYTYPE[] = [];
  _notVery: GROUP_KEYTYPE[] = ['iwa', 'hagane'];
  _doesntAffext: GROUP_KEYTYPE[] = ['goast'];
}
import { Group } from './Group';
import { GROUP_KEYTYPE } from '../classdata/groupClassDatas';

export class Kakutou extends Group {
  
  _name = 'かくとう';
  _keyType: GROUP_KEYTYPE = 'kakutou';
  _excellent: GROUP_KEYTYPE[] = ['normal', 'koori', 'aku', 'iwa', 'hagane'];
  _notVery: GROUP_KEYTYPE[] = ['doku', 'hikou', 'esper', 'faily', 'mushi'];
  _doesntAffext: GROUP_KEYTYPE[] = ['goast'];
  
}
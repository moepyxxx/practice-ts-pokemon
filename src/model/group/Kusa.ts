import { Group } from './Group';
import { GROUP_KEYTYPE } from '../classdata/groupClassDatas';

export class Kusa extends Group {
  
  _name = 'くさ';
  _keyType: GROUP_KEYTYPE = 'kusa';
  _excellent: GROUP_KEYTYPE[] = ['mizu', 'jimen', 'iwa'];
  _notVery: GROUP_KEYTYPE[] = ['kusa', 'honoo', 'doku', 'hikou', 'mushi', 'hagane', 'dragon'];
  _doesntAffext: GROUP_KEYTYPE[] = [];
}
import { Group } from './Group';
import { GROUP_KEYTYPE } from '../classdata/groupClassDatas';

export class Mizu extends Group {
  
  _name = 'みず';
  _keyType: GROUP_KEYTYPE = 'mizu';
  _excellent: GROUP_KEYTYPE[] = ['honoo', 'jimen', 'iwa'];
  _notVery: GROUP_KEYTYPE[] = ['kusa', 'mizu', 'dragon'];
  _doesntAffext: GROUP_KEYTYPE[] = [];
}
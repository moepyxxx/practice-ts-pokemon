import { Group } from './Group';
import { GROUP_KEYTYPE } from '../classdata/groupClassDatas';

export class Aku extends Group {
  
  _name = 'あく';
  _keyType: GROUP_KEYTYPE = 'aku';
  _excellent: GROUP_KEYTYPE[] = ['esper', 'goast'];
  _notVery: GROUP_KEYTYPE[] = ['kakutou', 'aku', 'faily'];
  _doesntAffext: GROUP_KEYTYPE[] = [];
}
import { Group } from '../Group';
import { GROUP_KEYTYPE } from '../../utils/datas/groupClassDatas';

export class Honoo extends Group {
  
  _name = 'ほのお';
  _keyType: GROUP_KEYTYPE = 'honoo';
  _excellent: GROUP_KEYTYPE[] = ['kusa', 'koori', 'mushi', 'hagane'];
  _notVery: GROUP_KEYTYPE[] = ['honoo', 'mizu', 'iwa', 'dragon'];
  _doesntAffext: GROUP_KEYTYPE[] = [];
}
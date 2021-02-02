import { Group } from '../Group';
import { GROUP_KEYTYPE } from '../../utils/datas/groupClassDatas';

export class Jimen extends Group {
  
  _name = 'じめん';
  _keyType: GROUP_KEYTYPE = 'jimen';
  _excellent: GROUP_KEYTYPE[] = ['honoo', 'denki', 'doku', 'iwa', 'hagane'];
  _notVery: GROUP_KEYTYPE[] = ['kusa', 'mushi'];
  _doesntAffext: GROUP_KEYTYPE[] = ['denki'];
}
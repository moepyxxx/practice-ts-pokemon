import { Group } from '../Group';
import { GROUP_KEYTYPE } from '../../utils/datas/groupClassDatas';

export class Denki extends Group {
  
  _name = 'でんき';
  _keyType: GROUP_KEYTYPE = 'denki';
  _excellent: GROUP_KEYTYPE[] = ['mizu', 'hikou'];
  _notVery: GROUP_KEYTYPE[] = ['denki', 'kusa', 'dragon'];
  _doesntAffext: GROUP_KEYTYPE[] = ['jimen'];
}
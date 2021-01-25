import { Denki } from '../../classes/Group/Denki';
import { Mizu } from '../../classes/Group/Mizu';
import { Kusa } from '../../classes/Group/Kusa';
import { Honoo } from '../../classes/Group/Honoo';
import { Jimen } from '../../classes/Group/Jimen';
import { Kakutou } from '../../classes/Group/Kakutou';
import { Normal } from '../../classes/Group/Normal';
import { Goast } from '../../classes/Group/Goast';
import { Group } from '../../classes/Group';

export type GROUP_KEYTYPE = 'denki' | 'hagane' | 'hikou' | 'koori' | 'kakutou' | 'mizu'
                            | 'kusa' | 'doku' | 'jimen' | 'mushi' | 'iwa' | 'dragon'
                            | 'aku' | 'goast' | 'esper' | 'faily' | 'normal' | 'honoo';

export const GROUP_CLASS_LIST: {
  [key: string]: Group;
} = {
  "denki": new Denki(),
  "hagane": new Denki(),
  "hikou": new Denki(),
  "koori": new Denki(),
  "kakutou": new Kakutou(),
  "mizu": new Mizu(),
  "kusa": new Kusa(),
  "doku": new Denki(),
  "jimen": new Jimen(),
  "mushi": new Denki(),
  "iwa": new Denki(),
  "dragon": new Denki(),
  "aku": new Denki(),
  "goast": new Goast(),
  "esper": new Denki(),
  "faily": new Denki(),
  "normal": new Normal(),
  "honoo": new Honoo(),
}
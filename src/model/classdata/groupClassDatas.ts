import { Denki } from '../group/Denki';
import { Mizu } from '../group/Mizu';
import { Kusa } from '../group/Kusa';
import { Honoo } from '../group/Honoo';
import { Jimen } from '../group/Jimen';
import { Kakutou } from '../group/Kakutou';
import { Normal } from '../group/Normal';
import { Goast } from '../group/Goast';
import { Group } from '../group/Group';

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
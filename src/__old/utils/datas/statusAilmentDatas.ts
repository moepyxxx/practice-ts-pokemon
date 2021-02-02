import { StatusAilment } from '../../classes/StatusAilment';
import { SaParalysis } from '../../classes/StatusAilment/SaParalysis';
import { SaBadPoison } from '../../classes/StatusAilment/SaBadPoison';
import { SaPoison } from '../../classes/StatusAilment/SaPoison';
import { SaFreeze } from '../../classes/StatusAilment/SaFreeze';
import { SaSleep } from '../../classes/StatusAilment/SaSleep';
import { SaBurn } from '../../classes/StatusAilment/SaBurn';
import { SaFainting } from '../../classes/StatusAilment/SaFainting';

export const STATUS_AILMENT_CLASS_LIST: {
  [key: string]: StatusAilment;
} = {
  'saBurn': new SaBurn(),
  'saFreeze': new SaFreeze(),
  'saParalysis': new SaParalysis(),
  'saPoison': new SaPoison(),
  'saBadPoison': new SaBadPoison(),
  'saSleep': new SaSleep(),
  'saFainting': new SaFainting()
}

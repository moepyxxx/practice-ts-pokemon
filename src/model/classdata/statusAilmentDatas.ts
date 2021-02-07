import { StatusAilment } from '../statusAilment/StatusAilment';
import { SaParalysis } from '../statusAilment/SaParalysis';
import { SaBadPoison } from '../statusAilment/SaBadPoison';
import { SaPoison } from '../statusAilment/SaPoison';
import { SaFreeze } from '../statusAilment/SaFreeze';
import { SaSleep } from '../statusAilment/SaSleep';
import { SaBurn } from '../statusAilment/SaBurn';
import { SaFainting } from '../statusAilment/SaFainting';

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

import { SaParalysis } from '../../classes/StatusAilment/SaParalysis';
import { StatusAilment } from '../../classes/StatusAilment';

export const STATUS_AILMENT_CLASS_LIST: {
  [key: string]: StatusAilment;
} = {
  'saBurn': new SaParalysis(),
  'saFreeze': new SaParalysis(),
  'saParalysis': new SaParalysis(),
  'saPoison': new SaParalysis(),
  'saSleep': new SaParalysis(),
  'saFainting': new SaParalysis()
}

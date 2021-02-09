import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { TGymClassification } from '../../utils/type/TGymClassification';

export class Gym extends Place {

  /**
   * ジムの分類
   */
  _gymClassification: TGymClassification;

  constructor(name: string, humans: (Ordinary | Trainer)[], gymClassification: TGymClassification) {
    super(name, humans);
    this._gymClassification = gymClassification;
  }
}
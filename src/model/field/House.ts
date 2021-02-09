import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';

export class House extends Place {

  constructor(name: string, humans: (Ordinary | Trainer)[]) {
    super(name, humans);
  }
}
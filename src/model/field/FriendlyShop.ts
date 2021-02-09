import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';

import { IBuyItems } from '../../utils/interface/IBuyItems';

export class FriendlyShop extends Place implements IBuyItems {

  constructor(name: string, humans: (Ordinary | Trainer)[]) {
    super(name, humans);
  }

  buyItems() :void {
    return;
  }
  
}
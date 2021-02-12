import { Ordinary } from '../../model/human/Ordinary';
import { Trainer } from '../../model/human/Trainer';

export type TEventHuman = {
  key: string;
  human: Ordinary | Trainer;
}
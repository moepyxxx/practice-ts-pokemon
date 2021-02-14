import { Pokemon } from '../pokemon/Pokemon';
import { Achamo } from '../pokemon/Achamo';
import { Mizugorou } from '../pokemon/Mizugorou';
import { Kimori } from '../pokemon/Kimori';
import { Pochiena } from '../pokemon/Pochiena';
import { Ziguzaguma } from '../pokemon/Ziguzaguma';

export const POKEMON_CLASS_LIST: {
  [key: string]: Pokemon;
} = {
  "mizugorou": new Mizugorou(),
  "achamo": new Achamo(),
  "kimori": new Kimori(),
  "pochiena": new Pochiena(),
  "ziguzaguma": new Ziguzaguma(),
}
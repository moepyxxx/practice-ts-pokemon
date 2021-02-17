import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { OwnPokemon } from '../pokemon/OwnPokemon';

import { IRecoverPokemons } from '../../utils/interface/IRecoverPokemons';
import { RecoverMachine } from '../machine/RecoverMachine';
import { Hero } from '../human/Hero';

export class PokemonCener extends Place implements IRecoverPokemons {

  /**
   * ジョーイさんを追加
   */
  private joisan: Ordinary = new Ordinary('ジョーイさん', '女', 'ポケモンを回復することを伝える');

  constructor(name: string, humans: (Ordinary | Trainer)[]) {
    super(name, humans);
  }

  talkJoisanToRecoverPokemon(...pokemons: OwnPokemon[]) {
    this.recoverPokemons(...pokemons);
    return this.joisan.talk(this.joisan._talkKey);
  }

  recoverPokemons(...pokemons: OwnPokemon[]): void {
    RecoverMachine.getInstance().recoverPokemon(...pokemons);
  }
  
}
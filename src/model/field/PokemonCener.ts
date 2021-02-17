import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { OwnPokemon } from '../pokemon/OwnPokemon';

import { IRecoverPokemons } from '../../utils/interface/IRecoverPokemons';
import { RecoverMachine } from '../machine/RecoverMachine';

export class PokemonCener extends Place implements IRecoverPokemons {

  constructor(name: string, humans: (Ordinary | Trainer)[]) {
    super(name, humans);
  }

  recoverPokemons(...pokemons: OwnPokemon[]) :void {
    RecoverMachine.getInstance().recoverPokemon(...pokemons);
  }
  
}
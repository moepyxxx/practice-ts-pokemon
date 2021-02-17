import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { ExceptPokemon } from '../pokemon/ExceptPokemon';
import { IWildPokemons } from '../../utils/interface/IWildPokemons';
import { IPokemonAppearPlaceClassification } from '../../utils/interface/IPokemonAppearPlaceClassification';
import { TPlaceClassification } from '../../utils/type/TPlaceClassification';
import { TWildPokemons } from '../../utils/type/TWildPokemons';

export class PokemonAppearPlace extends Place implements IWildPokemons, IPokemonAppearPlaceClassification {

  /**
   * 野生ポケモン
   */
  _wildPokemons: TWildPokemons[];

  /**
   * 場所の分類
   */
  _pokemonAppearPlaceClassification: TPlaceClassification;

  constructor(
    name: string,
    humans: (Ordinary | Trainer)[],
    wildPokemons: TWildPokemons[],
    placeClassification: TPlaceClassification
  ) {
    super(name, humans);
    this._wildPokemons = wildPokemons;
    this._pokemonAppearPlaceClassification = placeClassification;
  }
  
}
import { Place } from '../field/Place';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { ExceptPokemon } from '../pokemon/ExceptPokemon';
import { IWildPokemons } from '../../utils/interface/IWildPokemons';
import { IPokemonAppearPlaceClassification } from '../../utils/interface/IPokemonAppearPlaceClassification';
import { TPlaceClassification } from '../../utils/type/TPlaceClassification';

export class PokemonAppearPlace extends Place implements IWildPokemons, IPokemonAppearPlaceClassification {

  /**
   * 野生ポケモン
   */
  _wildPokemons: {
    trigger: 'すすむ' | 'つりする' | 'はなしかける';
    exceptPokemon: ExceptPokemon;
    appearingRate: number;
    lebelRange: number[];
  }[];

  /**
   * 場所の分類
   */
  _pokemonAppearPlaceClassification: TPlaceClassification;

  constructor(
    name: string,
    humans: (Ordinary | Trainer)[],
    wildPokemons: {
      trigger: 'すすむ' | 'つりする' | 'はなしかける';
      exceptPokemon: ExceptPokemon;
      appearingRate: number;
      lebelRange: number[];
    }[],
    placeClassification: TPlaceClassification
  ) {
    super(name, humans);
    this._wildPokemons = wildPokemons;
    this._pokemonAppearPlaceClassification = placeClassification;
  }
  
}
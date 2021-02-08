import { TFieldClassification } from '../../utils/type/TFieldClassification';
import { TPlaceClassification } from '../../utils/type/TPlaceClassification';
import { Ordinary } from '../human/Ordinary';
import { Trainer } from '../human/Trainer';
import { ExceptPokemon } from '../pokemon/ExceptPokemon';

export abstract class MapField {
  /**
   * フィールド名
   */
  abstract _name: string;

  /**
   * フィールドの分類
   */
  abstract _fieldClassification: TFieldClassification;

  /**
   * フィールドを構成する場所要素
   */
  protected abstract readonly _places: {
    placeClassification: TPlaceClassification;
    humans: (Ordinary | Trainer)[];
    pokemons: {
      exceptPokemon: ExceptPokemon;
      appearingRate: number;
      lebelRange: number[];
    }[];
  }[];

  get places() {
    return this._places;
  }
}

import { Human } from './Human';
import { OwnPokemon } from '../pokemon/OwnPokemon';
import { IOnHandPokemons } from '../../utils/interface/IOnHandPokemons';
import { ITalk } from '../../utils/interface/ITalk';
import { TALK_KEY_DATA } from '../keyData/talkKeyData';

export class Trainer extends Human implements ITalk, IOnHandPokemons {
  
  /**
   * 手持ちポケモン
   */
  _onHandPokemons: OwnPokemon[];

  /**
   * データがわりのキーを設定
   */
  _talkKey: string;

  constructor(name: string, gender: '男' | '女', onHandPokemon?: OwnPokemon[], talkKey?: string) {
    super(name, gender);
    this._onHandPokemons = onHandPokemon? this._onHandPokemons : [];

    if (talkKey) {
      this._talkKey = talkKey;
    }
  }

  set onHandPokemons(onHandPokemons: OwnPokemon[]) {
    this._onHandPokemons = onHandPokemons;
  }

  /**
   * 話す
   */
  talk(talkKey?: string) {
    const key = talkKey ? talkKey : this._talkKey;
    if (talkKey) {
      return `${this._name}：${TALK_KEY_DATA[talkKey]}`;
    }
  }
}
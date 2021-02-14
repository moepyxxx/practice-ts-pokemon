import { Hero } from "../model/human/Hero";
import { MapField } from '../model/field/MapField';
import { Place } from '../model/field/Place';
import { Ordinary } from "../model/human/Ordinary";
import { Trainer } from "../model/human/Trainer";
import { PokemonAppearPlace } from "../model/field/PokemonAppearPlace";
import { TWildPokemons } from '../utils/type/TWildPokemons';
import { POKEMON_CLASS_LIST } from '../model/classdata/pokemonClassData';
import { ExceptPokemon } from "../model/pokemon/ExceptPokemon";

export class MainController {
  public static _instance: MainController;

  /**
   * 現在のフィールド
   */
  public _field: MapField;

  /**
   * 現在の場所
   */
  public _place: Place;

  /**
   * 主人公
   */
  public _hero: Hero;

  private constructor() {
  }

  set hero(hero: Hero) {
    this._hero = hero;
  }

  public static getInstance(): MainController {
    if (!this._instance) {
      this._instance = new MainController();
      this._instance.renderSerif('ゲームをはじめよう');
    }
    return this._instance;
  }

  set field(field: MapField) {
    this._field = field;
    console.log(`${this._field.name}に移動した`);
  }

  set place(place: Place) {
    this._place = place;
    console.log(`${this._place._name}に移動した`);
  }

  heroWalk(place?: Place) {
    if (place) {
      this.place = place;
      return;
    }
    if (this._place instanceof PokemonAppearPlace) {
      const wildPokemons: TWildPokemons[] = this._place._wildPokemons;
      const filterWildPokemons: TWildPokemons[] = wildPokemons.filter(pokemon => pokemon.trigger === 'すすむ');
      const enemyPokemonInfo = this.assignAppearPokemon(filterWildPokemons);
      const enemyPokemon = new ExceptPokemon(enemyPokemonInfo.pokemon, enemyPokemonInfo.lebel);

      // ここでバトル開始（バトルコントローラー作成）
    }
    return;
  }

  heroTalkTo(human: Trainer | Ordinary) {
    // human.talk();
  }

  assignAppearPokemon(pokemons: TWildPokemons[]) {
    // pokemons
    // ダミーで表示
    return {
      pokemon: POKEMON_CLASS_LIST.achamo,
      lebel: 5
    };
  }

  renderSerif(serif: any): void{
    console.log(serif);
  }
}
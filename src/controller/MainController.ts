import { Hero } from "../model/human/Hero";
import { MapField } from '../model/field/MapField';
import { Place } from '../model/field/Place';
import { Ordinary } from "../model/human/Ordinary";
import { Trainer } from "../model/human/Trainer";
import { PokemonAppearPlace } from "../model/field/PokemonAppearPlace";
import { TWildPokemons } from '../utils/type/TWildPokemons';
import { ExceptPokemon } from "../model/pokemon/ExceptPokemon";
import { Pokemon } from "../model/pokemon/Pokemon";
import { PokemonBattleController } from './PokemonBattleController';

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
    console.log(`${this._hero.name}は${place?._name}のあたりを歩いた`);

    let assignedPokemon;
    if (this._place instanceof PokemonAppearPlace) {
      const wildPokemons: TWildPokemons[] = this._place._wildPokemons;
      const filterWildPokemons: TWildPokemons[] = wildPokemons.filter(pokemon => pokemon.trigger === 'すすむ');
      assignedPokemon = this.assignAppearPokemon(filterWildPokemons);
    }

    if (!assignedPokemon) {
      return;
    }

    const enemy = new ExceptPokemon(assignedPokemon.pokemon, assignedPokemon.lebel);
    const battleController = new PokemonBattleController(enemy);
  }

  heroTalkTo(human: Trainer | Ordinary) {
    // human.talk();
  }

  assignAppearPokemon(pokemons: TWildPokemons[]) {
 
    let allRange = 0;
    const assignTarget: { pokemon: Pokemon, min: number, max: number, lebelRange: number[] }[] = [];
    pokemons.forEach((current, index) => {
      const pokemon = current.pokemon;
      const lebelRange = current.lebelRange;
      const min = allRange;
      const max = allRange + current.appearingRate
      allRange += current.appearingRate;
      assignTarget.push({ pokemon, min, max, lebelRange })
    });

    const randomNum = Math.random() * allRange;
    const result = assignTarget.find((target) => {
      return (randomNum > target.min) && (randomNum < target.max);
    });

    let resultPokemon;
    let randomLebelNum;
    let resultLebel;
    if (result) {
      resultPokemon = result.pokemon;
      randomLebelNum = Math.floor(Math.random() * result.lebelRange.length);
      resultLebel = result.lebelRange[randomLebelNum];
      return {
        pokemon: resultPokemon,
        lebel: resultLebel
      };
    }
  }

  renderSerif(serif: any): void{
    console.log(serif);
  }
}
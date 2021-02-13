import { Hero } from "../model/human/Hero";
import { ExceptPokemon } from "../model/pokemon/ExceptPokemon";
import { OwnPokemon } from '../model/pokemon/OwnPokemon';
import { MainController } from "./MainController";

export class PokemonBattleController {

  /**
   * 主人公
   */
  _hero: Hero;

  /**
   * 敵ポケモン
   */
  _enemy: ExceptPokemon;

  /**
   * 主人公の繰り出したバトルポケモン
   */
  _onBattle: OwnPokemon;

  /**
   * 逃げるを選択した回数
   */
  runCount: number = 0;

   constructor(enemyPokemon: ExceptPokemon) {
     this._hero = Hero.getInstance();
     this._onBattle = this._hero._onHandPokemons[0];
     this._enemy = enemyPokemon;
     this.renderSerif(`${this._enemy.pokemon.name}があらわれた。いけ、${this._onBattle.pokemon.name}！`)
   }

  renderSerif(serif: any): void{
    console.log(serif);
  }
}
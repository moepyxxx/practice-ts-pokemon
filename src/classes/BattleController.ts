import { Pokemon } from '../classes/Pokemon';
import { Move } from '../classes/Move';
import { Group } from '../classes/Group';
import { ownPokemons } from '../utils/interface.general';
import { Achamo } from '../classes/Pokemon/Achamo';
import { Mizugorou } from '../classes/Pokemon/Mizugorou';
import { Kimori } from '../classes/Pokemon/Kimori';
import { Controller } from './Controller';
import { MOVE_CLASS_LIST } from '../utils/datas/moveClassDatas';
import { Nakigoe } from './Move/Nakigoe';

export class BattleController {

  public enemy: Pokemon;
  public ownPokemons: ownPokemons[];
  public pokemon: Pokemon;
  public controller: Controller;
  public runCount: number = 0;
  protected damageCorrection: number = 1;

  constructor(_ownPokemons: ownPokemons[], _controller: Controller) {
    this.ownPokemons = _ownPokemons;
    this.pokemon = this.ownPokemons[0].pokemon;
    
    if (this.pokemon instanceof Achamo) {
      this.enemy = new Mizugorou(null);
    } else if (this.pokemon instanceof Mizugorou) {
      this.enemy = new Kimori(null);
    } else {
      this.enemy = new Achamo(null);
    }

    this.controller = _controller;

    this.controller.view.renderSerif(`あ、${this.enemy.name}があらわれた！`);
    this.controller.view.renderSerif(`いけ、${this.pokemon.name}！`);

    this.setBattleSystem();
  }

  // setRunAction() {
  //   const trigger = document.querySelector('#a-nigeru') as HTMLButtonElement;
  //   trigger.addEventListener('click', (e) => {
  //     e.preventDefault();

  //     if (this.checkRun()) {
  //       this.controller.view.hideBattleField();
  //       this.controller.view.showMainField();
  //       this.controller.view.renderSerif(`${this.enemy.name}からにげることができた`);
  //     } else {
  //       this.runCount++;
  //       this.controller.view.renderSerif(`${this.enemy.name}からにげられなかった`);
  //     }
  //   });
  // }

  setBattleSystem() {

    const addedTrigger = document.querySelector('#action_field') as HTMLButtonElement;
    this.pokemon.moveList.forEach((moveList, index) => {
      const button = document.createElement('button');
      button.id = 'tatakau' + index;
      button.classList.add('action_class', 'btn', 'btn-primary', 'mr-1');
      button.textContent = moveList.move.name;
      addedTrigger.appendChild(button);
    })

    const actionTriggers = document.querySelectorAll<HTMLButtonElement>('.action_class');
    const runTrigger = document.querySelector('#a-nigeru') as HTMLButtonElement;

    // 敵ポケモンがわざを選択
    const enemyAiMove: Move = this.selectAiMove(this.enemy);
    let enemyDamage: number = 0;
    let pokemonDamage: number = 0;

    // たたかうを選択したとき
    actionTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();

        const index = Number((<HTMLButtonElement>e.target).id.slice(-1));
        const pokemonMove: Move = this.pokemon.moveList[index].move;

        if (this.checkFirstMove(pokemonMove, enemyAiMove)) {
          enemyDamage = this.tatakauAction(this.pokemon, this.enemy, pokemonMove);
          this.enemy.calculateRemainingHp('sub', enemyDamage);
          pokemonDamage = this.tatakauAction(this.enemy, this.pokemon, enemyAiMove);
          this.pokemon.calculateRemainingHp('sub', pokemonDamage);
        } else {
          pokemonDamage = this.tatakauAction(this.enemy, this.pokemon, enemyAiMove);
          this.pokemon.calculateRemainingHp('sub', pokemonDamage);
          enemyDamage = this.tatakauAction(this.pokemon, this.enemy, pokemonMove);
          this.enemy.calculateRemainingHp('sub', enemyDamage);
        }
        // ステータス確認用
        // console.log(this.pokemon.basicStatus);
        // console.log(pokemonDamage);
        // // console.log(this.pokemon.battleStatusRank);
        // // console.log(this.pokemon.statusAilment);
        // console.log(this.pokemon.remainingHp);

        // console.log(this.pokemon.basicStatus);
        // console.log(enemyDamage);
        // // console.log(this.enemy.battleStatusRank);
        // // console.log(this.enemy.statusAilment);
        // console.log(this.pokemon.remainingHp);
      });
    });

    // にげるを選択したとき
    runTrigger.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.checkRun()) {
        this.controller.view.hideBattleField();
        this.controller.view.showMainField();
        this.controller.view.renderSerif(`${this.enemy.name}からにげることができた`);
      } else {
        this.runCount++;
        this.controller.view.renderSerif(`${this.enemy.name}からにげられなかった`);
        pokemonDamage = this.tatakauAction(this.enemy, this.pokemon, enemyAiMove);
        this.pokemon.calculateRemainingHp('sub', pokemonDamage);
      }
      // ステータス確認用
      // console.log(this.pokemon.basicStatus);
      // console.log(pokemonDamage);
      // console.log(this.pokemon.battleStatusRank);
      // console.log(this.pokemon.statusAilment);
      // console.log(this.pokemon.remainingHp);
      // console.log(this.pokemon.basicStatus);
      // console.log(enemyDamage);
      // console.log(this.enemy.battleStatusRank);
      // console.log(this.enemy.statusAilment);
      // console.log(this.pokemon.remainingHp);
    });
  }

  tatakauAction(atkPokemon: Pokemon, defPokemon: Pokemon, move: Move): number {
    this.controller.view.renderSerif(`${atkPokemon.name}は${defPokemon.name}に、${move.name}した`)

    let damage = 0;

    // タイプ相性を計算
    const groupCompMessage:string | null = this.checkGroupCompMessage(move.type, defPokemon.groups);

    // 技種類の分岐
    let atk, def = 0;
    switch (move.species) {
      case '物理':
        atk = atkPokemon.basicStatus.attack;
        def = defPokemon.basicStatus.protected;
        break;
      case '特殊':
        atk = atkPokemon.basicStatus.SPattack;
        def = defPokemon.basicStatus.SPprotected;
        break;
      case '変化':
        atk = 0;
        def = 0;
        break;
    }

    // 命中判定
    const hit: boolean = this.checkHit(move.accuracy);

    if (!hit) {
      this.controller.view.renderSerif(`しかし、${defPokemon.name}にはあたらなかった`);
      return damage;
    }

    if (move.species === '変化') {
      const resultMsg = move.effects(atkPokemon, defPokemon);
      this.controller.view.renderSerif(resultMsg);
      return damage;
    } else {
      this.controller.view.renderSerif(groupCompMessage);

      // 急所判定
      let isCritical: boolean = false;
      if (move.criticalRank !== null) {
        isCritical = this.checkIsCritical(move.criticalRank);
      }
      if (isCritical) {
        this.controller.view.renderSerif('急所に当たった');
      }

      // 乱数補正値の計算
      this.calculateRandomNum();

      // タイプ一致補正値の計算
      this.calculateTypeMatch(move.type, atkPokemon.groups);


      damage = this.calculateDamage(
        atkPokemon.lebel,
        atk,
        def,
        <number>move.power,
        this.damageCorrection
      );

      // やけどをおったポケモンの攻撃の場合は、ダメージが半減する
      if (atkPokemon.statusAilment && move.species === '物理') {
        damage = atkPokemon.statusAilment.name === 'やけど'
          ? damage *= 0.5
          : damage;
      }

      this.controller.view.renderSerif(`${defPokemon.name}に${damage}のダメージ！`);

      this.damageCorrection = 1;
      return damage;
    }
  }

  checkFirstMove(pokemonMove: Move, enemyAiMove: Move): boolean {

    // 優先度の比較
    if (pokemonMove.priority > enemyAiMove.priority) {
      return true;
    } else if (enemyAiMove.priority > pokemonMove.priority) {
      return false;
    }

    // すばやさの比較
    const pokemonRapidity = this.pokemon.calculateBasicStatus(true).rapidity;
    const enemyRapidity = this.enemy.calculateBasicStatus(true).rapidity;
    if (pokemonRapidity > enemyRapidity) {
      return true;
    } else if (enemyRapidity > pokemonRapidity) {
      return false;
    }

    // ランダム比較
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0) {
      return true;
    } else {
      return false;
    }
  }

  selectAiMove(pokemon: Pokemon): Move {
    const randomNumber: number = Math.floor(Math.random() * 3);
    return pokemon.moveList[randomNumber].move;
  }

  checkRun(): boolean {
    const atkPokemonRapidity = this.pokemon.calculateBasicStatus(true).rapidity;
    const defPokemonRapidity = this.enemy.calculateBasicStatus(false).rapidity;
    const calculateBasicStatus = ((atkPokemonRapidity * 128 / defPokemonRapidity) + 30 * this.runCount) / 256;
    const randamNumber = Math.random();

    if (calculateBasicStatus >= randamNumber) {
      return true;      
    } else {
      return false;
    }
  }

  calculateTypeMatch(moveGroup: Group, atkPokemonGroups: Group[]): void {
    if (atkPokemonGroups.includes(moveGroup)) {
      this.damageCorrection *= 1.5;
    }
  }

  calculateRandomNum(): void {
    this.damageCorrection = (this.damageCorrection * (Math.floor(Math.random() * 16) + 85)) / 100;
  }

  checkIsCritical(moveCriticalRank: number): boolean {

    let chance: number;
    switch(moveCriticalRank) {
      case 0:
        chance = 4.17;
        break;
      case 1:
        chance = 12.5;
        break;
      case 2:
        chance = 50;
        break;
      default:
        chance = 100;
        break;
    }

    if ((chance * 100) >= Math.random() * 10000) {
      this.damageCorrection *= 1.5;
      return true;
    } else {
      return false;
    }
  }

  checkGroupCompMessage(pokemonMoveGroup: Group, enemyGroups: Group[]) {

    let damageCompMessage: string = '';
    enemyGroups.forEach(enemyGroup => {
      if (pokemonMoveGroup.doesntAffext.includes(enemyGroup.keyType)) {
        this.damageCorrection = 0;
        return null;
      }
      if (pokemonMoveGroup.excellent.includes(enemyGroup.keyType)) {
        this.damageCorrection *= 2;
      }
      if (pokemonMoveGroup.notVery.includes(enemyGroup.keyType)) {
        this.damageCorrection /= 2;
      }
    });

    if (this.damageCorrection === 0) {
      damageCompMessage = 'こうかがないみたいみたいだ';
    } else if (this.damageCorrection > 1) {
      damageCompMessage = 'こうかはばつぐんだ';
    } else if (this.damageCorrection < 1) {
      damageCompMessage = 'こうかはいまひとつだ';
    }

    return damageCompMessage;
  }

  checkHit(accuracy: number): boolean {
    if (!accuracy) {
      return true;
    }

    if (accuracy >= Math.random() * 101) {
      return true;
    } else {
      return false;
    }
  }

  calculateDamage(lebel: number, atk: number, def: number, power: number, correction: number) {
    let result = Math.floor(Math.floor(Math.floor(Math.floor(lebel * 2 / 5 + 2) * power * atk / def) / 50 + 2) * correction);
    if (result === 0) {
      result++;
    }
    return result;
  }

}
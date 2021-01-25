import { Pokemon } from '../classes/Pokemon';
import { Move } from '../classes/Move';
import { Group } from '../classes/Group';
import { ownPokemons } from '../utils/interface.general';
import { Achamo } from '../classes/Pokemon/Achamo';
import { Mizugorou } from '../classes/Pokemon/Mizugorou';
import { Kimori } from '../classes/Pokemon/Kimori';
import { Controller } from './Controller';

export class BattleController {

  public enemy: Pokemon;
  public ownPokemons: ownPokemons[];
  public pokemon: Pokemon;
  public controller: Controller;
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

    this.setNigeruAction();
    this.setTatakauAction();
  }

  setNigeruAction() {
    const trigger = document.querySelector('#a-nigeru') as HTMLButtonElement;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.controller.view.hideBattleField();
      this.controller.view.showMainField();
      this.controller.view.renderSerif(`${this.enemy.name}からにげることができた`);
    });
  }

  setTatakauAction() {

    const addedTrigger = document.querySelector('#action_field') as HTMLButtonElement;
    this.pokemon.moveList.forEach((moveList, index) => {
      const button = document.createElement('button');
      button.id = 'tatakau' + index;
      button.classList.add('action_class', 'btn', 'btn-primary', 'mr-1');
      button.textContent = moveList.move.name;
      addedTrigger.appendChild(button);
    })

    const triggers = document.querySelectorAll<HTMLButtonElement>('.action_class');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();

        const index = Number((<HTMLButtonElement>e.target).id.slice(-1));
        const move: Move = this.pokemon.moveList[index].move;
        const damage: number = this.tatakauAction(this.pokemon, this.enemy, move);
        console.log(damage);
      });
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

      this.controller.view.renderSerif(`${defPokemon.name}に${damage}のダメージ！`);

      this.damageCorrection = 1;
      return damage;
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
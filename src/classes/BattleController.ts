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

    // たたかうポケモンをセット
    interface MoveActionSet {
      pokemon: Pokemon,
      enemy: Pokemon,
      move: Move
    };
    const actionPokemons: MoveActionSet[] = [];

    // 敵ポケモンがわざを選択
    const enemyAiMove: Move = this.selectAiMove(this.enemy);

    // たたかうを選択したとき
    actionTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();

        const index = Number((<HTMLButtonElement>e.target).id.slice(-1));
        const pokemonMove: Move = this.pokemon.moveList[index].move;        

        const pokemonMoveData: MoveActionSet = {
          pokemon: this.pokemon,
          enemy: this.enemy,
          move: pokemonMove
        }
        const enemyMoveData: MoveActionSet = {
          pokemon: this.enemy,
          enemy: this.pokemon,
          move: enemyAiMove
        }

        actionPokemons.push(pokemonMoveData);
        actionPokemons.push(enemyMoveData);

        const checkedMoveOrderPokemons = this.checkMoveOrder(actionPokemons);
        this.actionExecute(checkedMoveOrderPokemons);

        // ステータス確認用
        // console.log(this.pokemon.basicStatus);
        // console.log(pokemonDamage);
        // // console.log(this.pokemon.battleStatusRank);
        // console.log(this.pokemon.statusAilment?.name);
        // console.log(this.pokemon.remainingHp);

        // console.log(this.pokemon.basicStatus);
        // console.log(enemyDamage);
        // // console.log(this.enemy.battleStatusRank);
        // console.log(this.enemy.statusAilment?.name);
        // console.log(this.enemy.remainingHp);
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

        const enemyMoveData: MoveActionSet = {
          pokemon: this.enemy,
          enemy: this.pokemon,
          move: enemyAiMove
        }

        actionPokemons.push(enemyMoveData);

        const checkedMoveOrderPokemons = this.checkMoveOrder(actionPokemons);
        this.actionExecute(checkedMoveOrderPokemons);
      }
      // ステータス確認用
      // console.log(this.pokemon.basicStatus);
      // console.log(pokemonDamage);
      // console.log(this.pokemon.battleStatusRank);
      // console.log(this.pokemon.statusAilment);
      // console.log(this.pokemon.remainingHp);
      // console.log(this.pokemon.statusAilment);
      // console.log(this.pokemon.basicStatus);
      // console.log(enemyDamage);
      // console.log(this.enemy.battleStatusRank);
      // console.log(this.enemy.statusAilment);
      // console.log(this.pokemon.remainingHp);
      // console.log(this.pokemon.statusAilment);
    });
  }

  actionExecute(pokemonMoves: { pokemon: Pokemon, enemy: Pokemon, move: Move }[]): void {

    pokemonMoves.forEach((moveAction) => {
      const damage = this.checkMoveAction(moveAction.pokemon, moveAction.enemy, moveAction.move);
      moveAction.enemy.calculateRemainingHp('sub', damage);

      if (this.checkPokemonSaFainting(moveAction.enemy)) {
        this.controller.view.hideBattleField();
        this.controller.view.showMainField();
        this.controller.view.renderSerif(`${moveAction.enemy.name}はたおれた。hpがゼロになったので、バトルが終了した！`);
      }
    });
    pokemonMoves.splice(0);

  }

  /**
   * たたかうアクションを選択したポケモンたちのわざだし順番をチェック
   */
  checkMoveOrder(pokemonMove: { pokemon: Pokemon, enemy: Pokemon, move: Move }[]): { pokemon: Pokemon, enemy: Pokemon, move: Move }[] {

    return pokemonMove.sort((next, cur) => {

      // わざの優先度を確認
      if (next.move.priority !== cur.move.priority) {
        if (next.move.priority < cur.move.priority) return 1;
        if (next.move.priority > cur.move.priority) return -1;
      }

      // ポケモンのすばやさを確認
      if (next.pokemon.calculateBasicStatus(true).rapidity !== cur.pokemon.calculateBasicStatus(true).rapidity) {
        if (next.pokemon.calculateBasicStatus(true).rapidity < cur.pokemon.calculateBasicStatus(true).rapidity) return 1;
        if (next.pokemon.calculateBasicStatus(true).rapidity > cur.pokemon.calculateBasicStatus(true).rapidity) return -1;
      }

      // ランダム確認
      const randomNum = Math.floor(Math.random() * 2);
      if (randomNum === 0) {
        return 1;
      } else {
        return -1;
      }

    });
  }

  checkPokemonSaFainting(pokemon: Pokemon): boolean {
    if (pokemon.statusAilment?.name === 'ひんし') {
      return true;
    }
    return false;
  }

  checkMoveAction(atkPokemon: Pokemon, defPokemon: Pokemon, move: Move): number {
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
    const isHit: boolean = this.checkIsHit(move.accuracy);

    if (!isHit) {
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
      this.damageCorrection = this.calculateRandomNumCor();

      // タイプ一致補正値の計算
      this.damageCorrection = this.calculateTypeMatchCor(move.type, atkPokemon.groups);


      damage = this.calculateDamage(
        atkPokemon.lebel,
        atk,
        def,
        <number>move.power,
        this.damageCorrection
      );
      
      damage = this.calculateStatusAilmentDamage(atkPokemon, defPokemon, move, damage);

      this.controller.view.renderSerif(`${defPokemon.name}に${damage}のダメージ！`);

      this.damageCorrection = 1;
      return damage;
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

  /**
   * 以下、すべてダメージ計算処理関係のメソッド
   */
  calculateTypeMatchCor(moveGroup: Group, atkPokemonGroups: Group[]): number {
    let damageCorrection = this.damageCorrection;
    if (atkPokemonGroups.includes(moveGroup)) {
      damageCorrection *= 1.5;
    }
    return damageCorrection;
  }

  calculateRandomNumCor(): number {
    return (this.damageCorrection * (Math.floor(Math.random() * 16) + 85)) / 100;
  }

  calculateStatusAilmentDamage(atkPokemon: Pokemon, defPokemon: Pokemon, move: Move, damage: number): number {
  
    // やけど ... やけどをおったポケモンの攻撃の場合は、ダメージが半減する
    if (atkPokemon.statusAilment && move.species === '物理') {
      damage = atkPokemon.statusAilment.name === 'やけど'
        ? damage *= 0.5
        : damage;
    }

    return damage;
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

  checkIsHit(accuracy: number): boolean {
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
import { STATUS_AILMENT_CLASS_LIST } from "../model/classdata/statusAilmentDatas";
import { Group } from "../model/group/Group";
import { Hero } from "../model/human/Hero";
import { Move } from "../model/move/Move";
import { ExceptPokemon } from "../model/pokemon/ExceptPokemon";
import { OwnPokemon } from '../model/pokemon/OwnPokemon';
import { TMoveActionSet } from "../utils/type/TMoveActionSet";

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
  _runCount: number = 0;

  /**
   * ダメージ補正値
   */
  protected damageCorrection: number = 1;

  constructor(enemyPokemon: ExceptPokemon) {
    this._hero = Hero.getInstance();
    this._onBattle = this._hero._onHandPokemons[0];
    this._enemy = enemyPokemon;
    this.renderSerif(`${this._enemy.pokemon.name}があらわれた。いけ、${this._onBattle.pokemon.name}！`)
  }

  /**
   * アクションの実装
   */
  setBattleAction(action: 'にげる' | 'たたかう', onBattleMove?: Move) {
    const enemyMove: Move = this.autoSelectMove(this._enemy);
    if (action === 'にげる') {
      // [todo]: 逃げるアクションはのちほど実装
    }

    if (!onBattleMove) {
      return;
    }

    const onBattleMoveList: TMoveActionSet = {
      attack: this._onBattle,
      defense: this._enemy,
      move: onBattleMove
    };
    const enemyMoveList: TMoveActionSet = {
      attack: this._enemy,
      defense: this._onBattle,
      move: enemyMove
    };

    const actionPokemons: TMoveActionSet[] = [onBattleMoveList, enemyMoveList];
    const checkedMoveOrderPokemons = this.checkMoveOrder(actionPokemons);

    this.actionExecute(checkedMoveOrderPokemons);
  }

  /**
   * ポケモンが自動でわざを選択
   */
  autoSelectMove(pokemon: ExceptPokemon): Move {
    const randomNumber: number = Math.floor(Math.random() * 3);
    return pokemon.moveList[randomNumber];
  }

  /**
   * たたかうアクションを選択したポケモンたちのわざだし順番をチェック
   */
  checkMoveOrder(orderTargetMoveActionSet: TMoveActionSet[]): TMoveActionSet[] {

    return orderTargetMoveActionSet.sort((next, cur) => {

      // わざの優先度を確認
      if (next.move.priority !== cur.move.priority) {
        if (next.move.priority < cur.move.priority) return 1;
        if (next.move.priority > cur.move.priority) return -1;
      }

      // ポケモンのすばやさを確認
      if (next.attack.calculateBasicStatus().rapidity !== cur.defense.calculateBasicStatus().rapidity) {
        if (next.attack.calculateBasicStatus().rapidity < cur.defense.calculateBasicStatus().rapidity) return 1;
        if (next.attack.calculateBasicStatus().rapidity > cur.defense.calculateBasicStatus().rapidity) return -1;
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

  /**
   * ポケモンが実際にたたかうを実行
   */
  actionExecute(moveActionSet: TMoveActionSet[]): void {

    moveActionSet.forEach((moveAction) => {
      const damage = this.checkMoveActionEffect(moveAction);
      this.calculateRemainingHp(moveAction.defense, 'sub', damage);

      if (this.checkPokemonSaFainting(moveAction.defense)) {
        this.renderSerif(`${moveAction.defense.pokemon.name}はたおれた。hpがゼロになったので、バトルが終了した！`);
      }
    });
    moveActionSet.splice(0);

  }

  /**
   * 残りhpの計算
   */
  calculateRemainingHp(target: OwnPokemon | ExceptPokemon, effect: 'saFainting' | 'sub' | 'add' | 'reset', number: number): number {
    switch (effect) {
      case 'add':
        target._remainingHp += number;
        break;
      case 'sub':
        target._remainingHp -= number;
        break;
      case 'reset':
        target._remainingHp = target.basicTotalStatus.hp;
        target._statusAilment = null;
        break;
      case 'saFainting':
        target._remainingHp = 0;
        target._remainingHp = target._remainingHp > target.basicTotalStatus.hp 
          ? target.basicTotalStatus.hp
          : target._remainingHp;
    }

    if (target._remainingHp <= 0) {
      target._statusAilment = STATUS_AILMENT_CLASS_LIST.saFainting;
      target._remainingHp = 0;
    }
    return target._remainingHp;
  }

  /**
   * 瀕死状態か確認
   */
  checkPokemonSaFainting(battlePokemon: OwnPokemon | ExceptPokemon): boolean {
    if (battlePokemon._statusAilment?.name === 'ひんし') {
      return true;
    }
    return false;
  }

  /**
   * わざの効果を確認
   */
  checkMoveActionEffect(moveActionSet: TMoveActionSet): number {
    this.renderSerif(`${moveActionSet.attack.pokemon.name}は${moveActionSet.defense.pokemon.name}に、${moveActionSet.move.name}した`)

    let damage = 0;

    // タイプ相性を計算
    const groupCompMessage:string | null = this.checkGroupCompMessage(moveActionSet.move.type, moveActionSet.defense.pokemon.groups);

    // 技種類の分岐
    let atk, def = 0;
    switch (moveActionSet.move.species) {
      case '物理':
        atk = moveActionSet.attack.basicTotalStatus.attack;
        def = moveActionSet.defense.basicTotalStatus.protected;
        break;
      case '特殊':
        atk = moveActionSet.attack.basicTotalStatus.SPattack;
        def = moveActionSet.defense.basicTotalStatus.SPprotected;
        break;
      case '変化':
        atk = 0;
        def = 0;
        break;
    }

    // 命中判定
    const isHit: boolean = this.checkIsHit(moveActionSet.move.accuracy);

    if (!isHit) {
      this.renderSerif(`しかし、${moveActionSet.defense.pokemon.name}Totalにはあたらなかった`);
      return damage;
    }

    if (moveActionSet.move.species === '変化') {
      const resultMsg = moveActionSet.move.effects(moveActionSet.attack, moveActionSet.defense);
      this.renderSerif(resultMsg);
      return damage;
    } else {
      this.renderSerif(groupCompMessage);

      // 急所判定
      let isCritical: boolean = false;
      if (moveActionSet.move.criticalRank !== null) {
        isCritical = this.checkIsCritical(moveActionSet.move.criticalRank);
      }
      if (isCritical) {
        this.renderSerif('急所に当たった');
      }

      // 乱数補正値の計算
      this.damageCorrection = this.calculateRandomNumCor();

      // タイプ一致補正値の計算
      this.damageCorrection = this.calculateTypeMatchCor(moveActionSet.move.type, moveActionSet.attack.pokemon.groups);


      damage = this.calculateDamage(
        moveActionSet.attack._lebel,
        atk,
        def,
        <number>moveActionSet.move.power,
        this.damageCorrection
      );
      
      damage = this.calculateStatusAilmentDamage(moveActionSet.attack, moveActionSet.defense, moveActionSet.move, damage);

      this.renderSerif(`${moveActionSet.attack.pokemon.name}に${damage}のダメージ！`);

      this.damageCorrection = 1;
      return damage;
    }
  }

  /**
   * こうかに関するメッセージを返す
   */
  checkGroupCompMessage(attackMoveGroup: Group, defenseGroups: Group[]) {

    let damageCompMessage: string = '';
    defenseGroups.forEach(defenseGroup => {
      if (attackMoveGroup.doesntAffext.includes(defenseGroup.keyType)) {
        this.damageCorrection = 0;
        return null;
      }
      if (attackMoveGroup.excellent.includes(defenseGroup.keyType)) {
        this.damageCorrection *= 2;
      }
      if (attackMoveGroup.notVery.includes(defenseGroup.keyType)) {
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

  /**
   * わざが当たったかどうか判定
   */
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

  /**
   * 急所に当たったかどうかを判定
   */
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
  /**
   * 以下、すべてダメージ計算処理関係のメソッド
   */
  calculateTypeMatchCor(moveGroup: Group, attackPokemonGroups: Group[]): number {
    let damageCorrection = this.damageCorrection;
    if (attackPokemonGroups.includes(moveGroup)) {
      damageCorrection *= 1.5;
    }
    return damageCorrection;
  }

  /**
   * 乱数補正値の計算
   */
  calculateRandomNumCor(): number {
    return (this.damageCorrection * (Math.floor(Math.random() * 16) + 85)) / 100;
  }

  /**
   * 状態異常による影響補正の計算
   */
  calculateStatusAilmentDamage(attack: OwnPokemon | ExceptPokemon, defense: OwnPokemon | ExceptPokemon, move: Move, damage: number): number {
  
    // やけど ... やけどをおったポケモンの攻撃の場合は、ダメージが半減する
    if (attack._statusAilment && move.species === '物理') {
      damage = attack._statusAilment.name === 'やけど'
        ? damage *= 0.5
        : damage;
    }

    return damage;
  }

  /**
   * ダメージ計算
   */
  calculateDamage(lebel: number, atk: number, def: number, power: number, correction: number) {
    let result = Math.floor(Math.floor(Math.floor(Math.floor(lebel * 2 / 5 + 2) * power * atk / def) / 50 + 2) * correction);
    if (result === 0) {
      result++;
    }
    return result;
  }

  renderSerif(serif: any): void{
    console.log(serif);
  }
}
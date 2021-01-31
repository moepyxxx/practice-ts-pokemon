import { basicStatus, IMove, IBattleStatusRank } from '../utils/interface.general';
import { randomMultipleInArray } from '../utils/functions';
import { Group } from './Group';
import { STATUS_AILMENT_CLASS_LIST } from '../utils/datas/statusAilmentDatas';
import { StatusAilment } from './StatusAilment';

export abstract class Pokemon {

  protected abstract _name: string;
  protected abstract _child: string | null;
  protected abstract _evolveLebel: number | null;

  protected abstract _groups: Group[];

  protected abstract _moveListToRequest: IMove[];
  protected abstract _initialLebel: number[];

  _lebel: number = 0;
  _exPoint: number = 0;
  _moveList: IMove[] = [];

  protected abstract _basicCategoryStatus: basicStatus;
  protected _basicIndividualStatus: basicStatus;
  protected _basicEffortStatus: basicStatus = {
    hp: 0,
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0
  }
  protected _basicStatus: basicStatus = {
    hp: 0,
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0
  }

  protected _battleStatusRank: IBattleStatusRank = {
    attack: 0,
    protected: 0,
    SPattack: 0,
    SPprotected: 0,
    rapidity: 0,
    critical: 0,
    accuracy: 0,
    evasion: 0,
  }

  protected abstract _remainingHp: number;

  protected _statusAilment: StatusAilment[] = [];

  protected abstract evolve(): Pokemon;

  constructor(protected _beforeEvole: Pokemon | null = null, protected _nickname?: string) {
    if (_nickname) {
      this._nickname = _nickname ? _nickname : this.name;
    }

    this._beforeEvole = _beforeEvole ?? null;

    this._basicIndividualStatus = this.setInitBasicIndividualStatus();
  }

  get name() {
    return this._name;
  }

  get child() {
    return this._child;
  }

  get nickname() {
    return this._nickname ?? this.name;
  }

  set nickname(nickname: string) {
    this._nickname = nickname;
  }

  get moveList() {
    return this._moveList;
  }

  set moveList(moveList) {
    this._moveList = moveList;
  }

  get moveListToRequest() {
    return this._moveListToRequest;
  }

  get lebel() {
    return this._lebel;
  }

  set lebel(lebel) {
    this._lebel = lebel;
  }

  get exPoint() {
    return this._exPoint;
  }

  set exPoint(exPoint) {
    this._exPoint += exPoint;

    if (this.lebel >= 100) return;

    if (this.getReqLebelUpExPoint() <= this.exPoint) {

      const beforeHp = this.basicStatus.hp;
      this.lebel ++;
      this.lebelUpAction(beforeHp);

      while (this.getReqLebelUpExPoint() < 0) {
        const beforeHp = this.basicStatus.hp;
        this.lebel ++;
        this.lebelUpAction(beforeHp);
      }

    }
  }

  get basicCategoryStatus() {
    return this._basicCategoryStatus;
  }

  set basicCategoryStatus(basicCategoryStatus) {
    this._basicCategoryStatus = basicCategoryStatus;
  }

  get basicEffortStatus() {
    return this._basicEffortStatus;
  }

  set basicEffortStatus(basicEffortStatus) {
    this._basicEffortStatus = basicEffortStatus;
  }

  get basicIndividualStatus() {
    return this._basicIndividualStatus;
  }

  set basicIndividualStatus(basicIndividualStatus) {
    this._basicIndividualStatus = basicIndividualStatus;
  }

  get basicStatus() {
    return this._basicStatus;
  }

  set basicStatus(basicStatus) {
    this._basicStatus = basicStatus;
  }

  get groups() {
    return this._groups;
  }

  get battleStatusRank() {
    return this._battleStatusRank;
  }

  get statusAilment() {
    return this._statusAilment[0] ?? null;
  }

  get remainingHp() {
    return this._remainingHp;
  }

  set remainingHp(number) {
    this._remainingHp = number;
  }

  takeOverPokemonData(beforeEvolvePokemon: Pokemon) {
    this._nickname = beforeEvolvePokemon.nickname;
    this._basicEffortStatus =beforeEvolvePokemon.basicEffortStatus;
    this._basicIndividualStatus =beforeEvolvePokemon.basicIndividualStatus;

    this._lebel =beforeEvolvePokemon.lebel;
    this._exPoint =beforeEvolvePokemon.exPoint;
    this._moveList =beforeEvolvePokemon.moveList;
    this._statusAilment = [beforeEvolvePokemon.statusAilment];

    // 現在のHPに合わせてレベルアップ後のHPを調整
    if (this.statusAilment?.name !== 'ひんし') {
      this._remainingHp = this.calculateRemainingHp('add', this.basicStatus.hp - beforeEvolvePokemon.remainingHp);
    }
  }

  resetStatusAilment(): void {
    this._statusAilment = [];
  }

  setStatusAilment(statusAilment: StatusAilment): string {
    if (statusAilment === STATUS_AILMENT_CLASS_LIST.saFainting || this._statusAilment.length === 0) {
      this._statusAilment = [];
      this._statusAilment.push(statusAilment);

      switch(statusAilment.name) {
        case 'まひ':
          this.subBattleStatusRank('rapidity', 1);
          break;
        default:
          break;
      }

      return this._statusAilment[0].getSickedMessage(this, 'sicked');
    } else if (statusAilment === this._statusAilment[0]) {
      return this._statusAilment[0].getSickedMessage(this, 'already');
    } else {
      return 'しかし、うまくきまらなかった';
    }
  }

  /**
   * レベルが上がったときの処理
   */
  protected lebelUpAction(beforeHp: number): void {

    // 現在のHPに合わせてレベルアップ後のHPを調整
    if (this.statusAilment?.name !== 'ひんし') {
      this.remainingHp = this.calculateRemainingHp('add', this.basicStatus.hp - beforeHp);
    }

    // 習得できるわざがあるかの確認
    const requestableMoveList: IMove[] = this.moveListToRequest.filter(moveList => moveList.lebel === this.lebel);
    if (requestableMoveList.length >= 1) {
      requestableMoveList.forEach(requestableMove => this.requestNewMove(requestableMove));
    }
  }


  /**
   * 残りhpの計算
   */
  calculateRemainingHp(effect: 'saFainting' | 'sub' | 'add' | 'reset', number: number): number {
    switch (effect) {
      case 'add':
        this.remainingHp += number;
        break;
      case 'sub':
        this.remainingHp -= number;
        break;
      case 'reset':
        this.remainingHp = this.basicStatus.hp;
        this.resetStatusAilment();
        break;
      case 'saFainting':
        this.remainingHp = 0;
        this.remainingHp = this.remainingHp > this.basicStatus.hp 
          ? this.basicStatus.hp
          : this.remainingHp;
    }

    if (this.remainingHp <= 0) {
      this.setStatusAilment(STATUS_AILMENT_CLASS_LIST.saFainting);
      this.remainingHp = 0;
    }
    return this.remainingHp;
  }


  /**
   * バトルステータスランクの加算
   */
  addBattleStatusRank(key: keyof IBattleStatusRank, number: number) {
    const statusName: {
      [key: string]: string
    } = {
      'attack': 'こうげき',
      'protected': 'ぼうぎょ',
      'SPattack': 'とくこう',
      'SPprotected': 'とくぼう',
      'rapidity': 'すばやさ',
      'critical': '急所のあたりやすさ',
      'accuracy': 'めいちゅうりつ',
      'evasion': 'かいひりつ',
    };

    const message: {
      [key: string]: string
    } = {
      '1': 'あがった',
      '2': 'ぐーんとあがった',
      '3': 'ぐぐーんとあがった',
      '12': '最大まであがった'
    };

    if (this.battleStatusRank[key] === 6) {
      return `${this.nickname}の${statusName[key]}はもう上がらない`;
    }

    this.battleStatusRank[key] += number;

    if (this.battleStatusRank[key] > 6) {
      this.battleStatusRank[key] = 6;
    }

    return `${this.name}の${statusName[key]}が${message[number.toString()]}`;
  }


  /**
   * バトルステータスランクの減算
   */
  subBattleStatusRank(key: keyof IBattleStatusRank, number: number) {
    const statusName: {
      [key: string]: string
    } = {
      'attack': 'こうげき',
      'protected': 'ぼうぎょ',
      'SPattack': 'とくこう',
      'SPprotected': 'とくぼう',
      'rapidity': 'すばやさ',
      'critical': '急所のあたりやすさ',
      'accuracy': 'めいちゅうりつ',
      'evasion': 'かいひりつ',
    };

    const message: {
      [key: string]: string
    } = {
      '1': 'さがった',
      '2': 'がくっとさがった',
      '3': 'がくーんとさがった',
    };

    if (this.battleStatusRank[key] === -6) {
      return `${this.name}の${statusName[key]}はもうさがらない`;
    }

    this.battleStatusRank[key] -= number;

    if (this.battleStatusRank[key] < -6) {
      this.battleStatusRank[key] = -6;
    }

    return `${this.name}の${statusName[key]}が${message[number.toString()]}`;
  }

  /**
   * 次のレベルに必要な経験値を取得
   */
  getReqLebelUpExPoint(): number {
    if (this.lebel >= 100) {
      return 0;
    }
    return (Math.pow(this.lebel + 1, 3)) - this.exPoint;
  }

  /**
   * 画面へのレンダリング処理
   */
  render(speech: string) {
    const targetSpeechField = document.querySelector('#speech_field') as HTMLUListElement;
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = speech;
    targetSpeechField.appendChild(li);
  }


  /**
   * 新しいわざをおぼえたいときのリクエスト
   */
  requestNewMove(requestMove: IMove) {
    if (this.moveList.includes(requestMove)) {
      return `${requestMove.move.name}はすでにおぼえています。`;
    }

    if (!this.moveListToRequest.includes(requestMove)) {
      return `${this.nickname}は${requestMove.move.name}を覚えることができません。`;
    }

    if (this.moveList.length >= 4) {

      const forgetMove = this.moveList[0];
      const newMove = this.moveList.slice();
      newMove.shift();
      newMove.push(requestMove);
      this.moveList = newMove;
      return `${this.nickname}は${forgetMove.move.name}をわすれて、あたらしく${requestMove.move.name}をおぼえた`;

    } else {

      const newMove = this.moveList.slice();
      newMove.push(requestMove);
      this.moveList = newMove;
      return `${this.nickname}はあたらしく${requestMove}をおぼえた`;

    }

  }


  /**
   * さいしょにおぼえるわざの習得
   */
  getInitialMoveList(lebel: number): IMove[] {
    const moveListFromCurrentLebel: IMove[] = this.moveListToRequest.filter(object => object.lebel <= lebel);
    
    if (moveListFromCurrentLebel.length > 4) {
      return randomMultipleInArray<IMove>(moveListFromCurrentLebel, 4);
    } else {
      return moveListFromCurrentLebel;
    }
  }

  /**
   * 個体値をランダムでセットする
   */
  setInitBasicIndividualStatus(): basicStatus {
    const basicIndividualStatusTmp = {
      hp: 0,
      attack: 0,
      protected: 0,
      SPattack: 0,
      SPprotected: 0,
      rapidity: 0
    }
    for (let k of Object.keys(basicIndividualStatusTmp) as (keyof basicStatus)[]) {
      basicIndividualStatusTmp[k] = Math.floor(Math.random() * 32);
    }
    return basicIndividualStatusTmp;
  }


  /**
   * 種族値・個体値・努力値のステータスを計算して返却
   * @param boolean 状態異常補正を行うかどうか
   */
  calculateBasicStatus(isStatusAilmentCorrection: boolean = false): basicStatus {
    for (let k of Object.keys(this.basicStatus) as (keyof basicStatus)[]) {
      const common = ((this._basicCategoryStatus[k] * 2) + this._basicIndividualStatus[k] + this._basicEffortStatus[k]) * this.lebel / 100;
      this.basicStatus[k] = k === 'hp' 
        ? Math.round(common + this.lebel + 10)
        : Math.round(common + 5)
      ;
    }

    if (isStatusAilmentCorrection && this.statusAilment) {
      const rapidityBattleStatusRankCorrection = this.calculateBattleStatusRankCorrection('rapidity');
      this.basicStatus.rapidity *= rapidityBattleStatusRankCorrection;

      // 状態異常がステータスに影響をおよぼす場合は計算
      switch(this.statusAilment.name) {
        case 'まひ':
          this.basicStatus.rapidity *= 0.5;
          break;
      }
    }

    return this.basicStatus;
  }

  /**
   * ランク補正値の計算
   */
  calculateBattleStatusRankCorrection(key: keyof IBattleStatusRank): number {
    const rank = this.battleStatusRank[key];
    let per;
    if (rank >= 0) {
      per = (rank + 2) / 2;
    } else {
      per = 2 / (2 - rank);
    }
    return Math.floor(per);
  }


  /**
   * 進化できるかの判定処理
   */
  checkWillEvolve(): Pokemon { 
    if (this._evolveLebel && this.lebel >= this._evolveLebel) {
      return this.evolve();
    } else {
      return this;
    }
  }
}
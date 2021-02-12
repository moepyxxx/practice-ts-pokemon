import { Hero } from '../model/human/Hero';
import { Achamo } from '../model/pokemon/Achamo';
import { ExceptPokemon } from '../model/pokemon/ExceptPokemon';
import { OwnPokemon } from '../model/pokemon/OwnPokemon';
import { TEventHuman } from '../utils/type/TEventHuman';
import { MainController } from './MainController';

export class EventController {
  public static _instance: EventController;

  /**
   * イベントを発火させる登場人物
   */
  public _humans: TEventHuman[] = [];

  /**
   * トリガー
   */
  private _trigger: boolean;

  /**
   * コンストラクタ
   */
  private constructor() {
  }

  public static getInstance(): EventController {
    if (!this._instance) {
      this._instance = new EventController();
    }
    return this._instance;
  }

  /**
   * 人のセット・削除
   */
  public setHumans(operation: 'sub' | 'add', ...args: TEventHuman[]): void {
    args.forEach((newHuman) => {
      switch(operation) {
        case 'add':

          let index;
          if (this._humans !== []) {
            index = this._humans.includes(newHuman);
          }
          if (!index) {
            this._humans.push(newHuman);
          }
          break;

        case 'sub':

          if (this._humans === []) {
            break;
          }

          this._humans.findIndex(already => already.key === newHuman.key);
          if (index) {
            this._humans.splice(index, 1);
          }

          break;
      }
    });
  }

  /**
   * イベント群
   */
  public events(eventKey: string): {} | null{ 
    let result = null;
    switch(eventKey) {
      case '1-1':
        const mother = this._humans?.find(human => human.key === 'mama');
        if (mother?.human) {
          const talk = mother.human.talk('102番道路へ行くお願いをする');
          MainController.getInstance().renderSerif(talk);
        };
        break;
      case '1-2':
        const hakase = this._humans?.find(human => human.key === 'hakase');
        if (hakase?.human) {
          const talk = hakase.human.talk('野生のポケモンに襲われている博士が助けを求める');
          MainController.getInstance().renderSerif(talk);
        }
        const eAchamo = new ExceptPokemon(new Achamo, 5);
        const achamo = new OwnPokemon(eAchamo, MainController.getInstance()._field.name);
        MainController.getInstance()._hero.getNewPokemon(achamo);
        MainController.getInstance().renderSerif(`${MainController.getInstance()._hero.name}は、${achamo.pokemon.name}に決めた`);
        break;
    }
    return result;
  }
}
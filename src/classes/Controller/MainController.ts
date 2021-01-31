import { getPokemon, checkImportText } from '../../utils/functions';
import { POKEMON_CLASS_LIST } from '../../utils/datas/pokemonClassDatas';
import { Pokemon } from '../../classes/Pokemon';
import { MainView } from '../../classes/View/MainView';
import { ownPokemons } from '../../utils/interface.general';
import { BattleController } from '../../classes/Controller/BattleController';

export class MainController {
  public view: MainView;
  public pokemonsAllHave: ownPokemons[] = [];
  public pokemonsOnHave: ownPokemons[] = [];
  public trigger = <HTMLButtonElement>document.querySelector('#trigger');
  private static _instance: MainController;

  private constructor() {
    this.view = MainView.getInstance();
    this.setSelectPokemonBtn();
  }

  setGetExpointBtn() {
    const trigger = document.querySelector('#expoint') as HTMLButtonElement;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();

      const targetExPoint:number = Number((document.getElementById('expointNumber') as HTMLInputElement).value);
      this.pokemonsOnHave[0].pokemon.exPoint = targetExPoint;
    });
  }

  setStartBattleBtn() {
    const trigger = document.querySelector('#battle') as HTMLButtonElement;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.view.showBattleField();
      this.view.hideMainField();
      this.view.resetRenderedSerif();
      this.buttle();
    });
  }

  setShowStrengthBtn() {
    const trigger = document.querySelector('#tsuyosa') as HTMLButtonElement;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.setStatusDetail(this.pokemonsOnHave[0].pokemon);
      this.setStatusStrength(this.pokemonsOnHave[0].pokemon);
      this.setStatusMove(this.pokemonsOnHave[0].pokemon);

      this.view.showStatusField();
    });
  }

  setStatusDetail(_Pokemon: Pokemon | null = null): void {
    const Pokemon = _Pokemon ? _Pokemon : this.pokemonsOnHave[0].pokemon;

    let group: string = '';
    Pokemon.groups.forEach((value, index) => {
      group += value.name;
      if (index !== Pokemon.groups.length -1) {
        group += '、';
      }
    });

    const nickname = Pokemon.nickname == '' ? Pokemon.name : Pokemon.nickname;

    const detailDatas: {
      [key: string]: string | number;
    } = {
      'p-name':Pokemon.name,
      'p-nickname': nickname,
      'p-type': group,
      'p-lebel': Pokemon.lebel,
      'p-expoint': Pokemon.exPoint,
      'p-next': Pokemon.getReqLebelUpExPoint()
    }
    Object.keys(detailDatas).forEach(key => {
      const target: HTMLTableRowElement = document.getElementById(`${key}`) as HTMLTableRowElement;
      target.textContent = detailDatas[key].toString() ?? '-';
    });
  }

  setStatusStrength(_Pokemon: Pokemon | null = null): void {
    const Pokemon = _Pokemon ? _Pokemon : this.pokemonsOnHave[0].pokemon;

    const strengthDatas: {
      [key: string]: number;
    } = {
      's-hp': Pokemon.basicStatus.hp,
      's-attack': Pokemon.basicStatus.attack,
      's-protected': Pokemon.basicStatus.protected,
      's-spattack': Pokemon.basicStatus.SPattack,
      's-spprotected': Pokemon.basicStatus.SPprotected,
      's-rapidity': Pokemon.basicStatus.rapidity,
    }

    Object.keys(strengthDatas).forEach(key => {
      const target: HTMLTableRowElement = document.getElementById(`${key}`) as HTMLTableRowElement;
      target.textContent = strengthDatas[key].toString() ?? '-';
    });
  }

  setStatusMove(_Pokemon: Pokemon | null = null): void {
    const Pokemon = _Pokemon ? _Pokemon : this.pokemonsOnHave[0].pokemon;
    const target = document.getElementById('movelist');

    Pokemon.moveList.forEach(obj => {
      const ppStr = obj.move.pp.toString();
      const tr = document.createElement('tr');

      const thName = document.createElement('th');
      thName.textContent = obj.move.name;

      const tdGroup = document.createElement('td');
      tdGroup.textContent = obj.move.type.name;

      const tdPp = document.createElement('td');
      tdPp.textContent = ppStr + '/' + ppStr;

      tr.appendChild(thName);
      tr.appendChild(tdGroup);
      tr.appendChild(tdPp);

      if (target) {
        target.appendChild(tr);
      }
    });
  };

  setSelectPokemonBtn() {
    const trigger = document.querySelector('#trigger') as HTMLButtonElement;
    
    trigger.addEventListener('click', (e) => {
      e.preventDefault();

      this.setShowStrengthBtn();
      this.setGetExpointBtn();
      this.setStartBattleBtn();
    
      let flag = true;
      const targetPokemonHtml = document.getElementById('pokemon') as HTMLSelectElement;
      const pOptions: HTMLOptionElement = targetPokemonHtml.options[targetPokemonHtml.selectedIndex];
      const pokemon: string = (<HTMLOptionElement>pOptions).value;

      const targetPokemonNickname = document.getElementById('nickname') as HTMLInputElement;

      let nickname = '';
      if (targetPokemonNickname.value) {
        if (checkImportText(targetPokemonNickname.value)) {
          nickname = targetPokemonNickname.value;
        } else {
          flag = false;
          this.view.renderSerif('ニックネームは５文字以内のひらがな・カタカナにしてね');
        }
      }

      let result;

      result = flag && POKEMON_CLASS_LIST[pokemon]
          ? getPokemon(POKEMON_CLASS_LIST[pokemon], null, nickname)
          : '選択されたポケモンは存在しません。';

      if (result instanceof Pokemon) {
        const newGetPokemon = result;

        const lastId = this.pokemonsAllHave.slice(-1)[0]?.id ?? 0;
        const id =lastId + 1;
        this.pokemonsAllHave.push({id, pokemon: newGetPokemon});
        if (this.pokemonsOnHave.length < 6) {
          this.pokemonsOnHave.push({id, pokemon: newGetPokemon});          
        }

        this.view.renderSerif(`${newGetPokemon.name}をゲットした。（ニックネーム：${newGetPokemon.nickname}）`);
        newGetPokemon.groups.forEach((group, index) => {
          this.view.renderSerif(`タイプ${index + 1}：${group.name}`)
        });
        this.view.renderSerif(`おぼえているわざ：`);
        newGetPokemon.moveList.forEach(move => {
          this.view.renderSerif(`${move.move.name}（${move.move.type.name}）`);
        });
        this.view.hideInitialField();
        this.view.showMainField();

      } else if (typeof result === 'string') {
        this.view.renderSerif(result);
      }
    });

  }

  buttle() {
    const battleController = new BattleController(this.pokemonsOnHave, this);
  }

  public static getInstance(): MainController {
    if (!this._instance) {
      this._instance = new MainController();
    }
    return this._instance;
  }
}
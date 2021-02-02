export class BattleView {
  public serifTarget: HTMLElement = document.querySelector('#speech_field') as HTMLUListElement;
  private mainField: HTMLElement = document.querySelector('#main_field') as HTMLUListElement;;
  private battleField: HTMLElement = document.querySelector('#battle_field') as HTMLUListElement;;
  private static _instance: BattleView;
  
  private constructor() {

  }

  renderSerif(speechText: string) {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = speechText;
    this.serifTarget.appendChild(li);
  }

  resetRenderedSerif() {
    while(this.serifTarget.firstChild) {
      this.serifTarget.removeChild(this.serifTarget.firstChild);
    }
  }

  hideMainField() {
    this.mainField.style.display = 'none';
  }

  hideBattleField() {
    this.battleField.style.display = 'none';
  }

  showMainField() {
    this.mainField.style.display = 'block';
  }

  showBattleField() {
    this.battleField.style.display = 'block';
  }

  public static getInstance(): BattleView {
    if (!this._instance) {
      this._instance = new BattleView();
    }
    return this._instance;
  }
  
}
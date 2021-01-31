export class MainView {
  public serifTarget: HTMLElement = document.querySelector('#speech_field') as HTMLUListElement;
  private initialField: HTMLElement;
  private mainField: HTMLElement;
  private battleField: HTMLElement;
  private statusField: HTMLElement;
  private static _instance: MainView;
  
  private constructor() {
    this.mainField = document.querySelector('#main_field') as HTMLUListElement;
    this.initialField = document.querySelector('#initial_field') as HTMLUListElement;
    this.battleField = document.querySelector('#battle_field') as HTMLUListElement;
    this.statusField = document.querySelector('#status_field') as HTMLUListElement;
    this.mainField.style.display = 'none';
    this.battleField.style.display = 'none';
    this.statusField.style.display = 'none';
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

  hideInitialField() {
    this.initialField.style.display = 'none';
  }

  hideMainField() {
    this.mainField.style.display = 'none';
  }

  hideBattleField() {
    this.battleField.style.display = 'none';
  }

  hideStatusField() {
    this.statusField.style.display = 'none';
  }

  showMainField() {
    this.mainField.style.display = 'block';
  }

  showBattleField() {
    this.battleField.style.display = 'block';
  }

  showStatusField() {
    this.statusField.style.display = 'block';
  }

  public static getInstance(): MainView {
    if (!this._instance) {
      this._instance = new MainView();
    }
    return this._instance;
  }
  
}
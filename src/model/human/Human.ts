export abstract class Human {

  /**
   * 名前
   */
  protected readonly _name: string;

  /**
   * 性別
   */
  protected readonly _gender: '男' | '女';

  constructor(name: string, gender: '男' | '女') {
    this._name = name;
    this._gender = gender;
  }

  get name() {
    return this._name;
  }

  get gender() {
    return this._gender;
  }
}
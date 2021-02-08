export abstract class Human {

  /**
   * 名前
   */
  readonly _name: string;

  /**
   * 性別
   */
  readonly _gender: '男' | '女';

  constructor(name: string, gender: '男' | '女') {
    this._name = name;
    this._gender = gender;
  }
}
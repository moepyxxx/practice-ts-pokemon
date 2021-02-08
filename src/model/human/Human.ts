export abstract class Human {

  /**
   * 名前
   */
  abstract readonly _name: string;

  /**
   * 性別
   */
  abstract readonly _gender: '男' | '女';
}
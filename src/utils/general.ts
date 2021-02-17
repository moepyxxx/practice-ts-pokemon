import { Pokemon } from '../model/pokemon/Pokemon';

/**
 * 配列の中からランダムで返す処理
 */
export const randomSingleInArray = <T>(array: T[]): T => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}


/**
 * 配列の中から指定した数の要素をランダムで返す処理（重複なし）
 * @param array 取り出す対象の配列
 * @param count 取り出したい個数
 */
export const randomMultipleInArray = <T>(array: T[], count: number): T[] => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * array.length);
    result[i] = array[index];
    array.splice(index, 1);
  }
  return result;
}


/**
 * 指定されたポケモンの生成を返す
 */
export const getPokemon = <T extends Pokemon>(PokemonType: new (isBeforeEvolve: Pokemon | null, nickname?: string) => T, isBeforeEvolve: Pokemon | null = null, nickname?: string): Pokemon => {
  return new PokemonType(isBeforeEvolve, nickname);
}


  /**
   * テキストが規定通りかチェック
   */
export const checkImportText = (checkText: string): boolean => {
  if(checkText
    && (checkText.match(/^[ぁ-んー　]*$/) || checkText.match(/^[ァ-ヶー　]+$/))
    && checkText.length <= 5){
    return true;
  } else {
    return false;
  }
}
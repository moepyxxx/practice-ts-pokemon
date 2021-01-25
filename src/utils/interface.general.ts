import { Pokemon } from '../classes/Pokemon';
import { Move } from '../classes/Move';

export interface basicStatus {
  hp: number,
  attack: number,
  protected: number,
  SPattack: number,
  SPprotected: number,
  rapidity: number
}

export interface ownPokemons {
  id: number;
  pokemon: Pokemon;
}

export interface status {
  name: string;
  nickname: string;
  lebel: number;
  moveList: IMove[];
  exPoint: number;
  reqLevelUpExPoint: number;
}

export interface IMove {
  lebel: number,
  move: Move
}
import {} from '../../model/pokemon/OwnPokemon';
import { OwnPokemon } from '../../model/pokemon/OwnPokemon';

export type THeroStatus = {
  name: string,
  gender: '男' | '女',
  money: string,
  onHandPokemons: OwnPokemon[] | string,
  onHandGymBadge: OwnPokemon[] | string
}
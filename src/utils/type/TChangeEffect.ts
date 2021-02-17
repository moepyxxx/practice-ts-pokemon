import { ExceptPokemon } from "../../model/pokemon/ExceptPokemon";
import { OwnPokemon } from "../../model/pokemon/OwnPokemon";
import { StatusAilment } from "../../model/statusAilment/StatusAilment";
import { TBattleStatusRank } from "./TBattleStatusRank";

export type TChangeEffext = {
  target: ExceptPokemon | OwnPokemon,
  change: 'add' | 'sub' | 'statusAilment',
  battleRank?: keyof TBattleStatusRank,
  degree?: number,
  status?: StatusAilment | null
}
import { TBasicStatus } from '../type/TBasicStatus';

export interface IStatus {
  _basicTotalStatus: TBasicStatus;
  _basicIndividualStatus: TBasicStatus;
  _basicPokemonStatus: TBasicStatus;
  _basicEffortStatus: TBasicStatus;
  calculateBasicStatus: () => TBasicStatus;
};
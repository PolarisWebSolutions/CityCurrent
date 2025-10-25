import { TileId } from "./tiles";

export interface EconomyBalance {
  baseIncomePerMin: number;
  baseUpkeepPerMin: number;
  tileModifiers: Partial<Record<TileId, number>>;
}

export const BALANCE: EconomyBalance = {
  baseIncomePerMin: 0,
  baseUpkeepPerMin: 0,
  tileModifiers: {}
};

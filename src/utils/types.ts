import type { TileId } from "../data/tiles";
import type { BoundingBox } from "./geo";

export type Difficulty = "easy" | "standard" | "hard";

export interface GridCell {
  tileId: TileId | null;
  level: number;
  powered: boolean;
}

export interface GameState {
  bbox: BoundingBox;
  cellMeters: number;
  gridWidth: number;
  gridHeight: number;
  grid: GridCell[];
  money: number;
  incomePerMin: number;
  demand: number;
  supply: number;
  stored: number;
  storageCap: number;
  pollution: number;
  happiness: number;
  timeOfDay: number;
  difficulty: Difficulty;
  selectedTile: TileId | null;
  undoStack: GameStateSnapshot[];
  redoStack: GameStateSnapshot[];
  paused: boolean;
  seed: string;
}

export interface GameActions {
  selectTile(tile: TileId | null): void;
  placeTile(index: number, tile: TileId): void;
  removeTile(index: number): void;
  tick(): void;
}

export type GameStateSnapshot = Pick<GameState, "grid" | "money" | "supply" | "demand" | "stored">;

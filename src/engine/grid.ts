import { GameState, GridCell } from "../utils/types";
import { createBoundingBox } from "../utils/geo";

const GRID_METERS = 2000;
const CELL_METERS = 50;

export function createInitialGrid(): GridCell[] {
  const cellsPerSide = GRID_METERS / CELL_METERS;
  return Array.from({ length: cellsPerSide * cellsPerSide }, () => ({
    tileId: null,
    level: 0,
    powered: false
  }));
}

export function createInitialState(): GameState {
  const bbox = createBoundingBox([43.6532, -79.3832], GRID_METERS);
  const grid = createInitialGrid();
  return {
    bbox,
    cellMeters: CELL_METERS,
    gridWidth: GRID_METERS / CELL_METERS,
    gridHeight: GRID_METERS / CELL_METERS,
    grid,
    money: 1_000_000,
    incomePerMin: 0,
    demand: 0,
    supply: 0,
    stored: 0,
    storageCap: 0,
    pollution: 0,
    happiness: 1,
    timeOfDay: 12,
    difficulty: "standard",
    selectedTile: "PowerLine",
    undoStack: [],
    redoStack: [],
    paused: false,
    seed: "citycurrent"
  };
}

import type { GameState } from "../utils/types";

const STORAGE_KEY = "citycurrent-export";

export function exportGameState(state: GameState): string {
  return JSON.stringify(state);
}

export function importGameState(data: string): GameState {
  return JSON.parse(data) as GameState;
}

export function saveToLocalStorage(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, exportGameState(state));
}

export function loadFromLocalStorage(): GameState | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return importGameState(data);
  } catch (error) {
    console.warn("Failed to load saved game", error);
    return null;
  }
}

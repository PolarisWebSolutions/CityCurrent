import create from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, GameActions } from "../utils/types";
import type { TileId } from "../data/tiles";
import { createInitialState } from "../engine/grid";

interface OverlayState {
  overlayVisible: boolean;
  toggleOverlay(): void;
}

type StoreState = GameState & GameActions & OverlayState;

export const useGameStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      overlayVisible: true,
      toggleOverlay: () => set((state) => ({ overlayVisible: !state.overlayVisible })),
      selectTile: (tile) => set({ selectedTile: tile }),
      placeTile: (index: number, tile: TileId) => {
        set((state) => {
          const grid = state.grid.slice();
          grid[index] = { ...grid[index], tileId: tile };
          return { grid };
        });
      },
      removeTile: (index: number) => {
        set((state) => {
          const grid = state.grid.slice();
          grid[index] = { ...grid[index], tileId: null };
          return { grid };
        });
      },
      tick: () => {
        const state = get();
        set({
          timeOfDay: (state.timeOfDay + 0.01) % 24,
          incomePerMin: state.incomePerMin,
          money: state.money,
          supply: state.supply,
          demand: state.demand
        });
      }
    }),
    {
      name: "citycurrent-save",
      partialize: (state) => ({
        grid: state.grid,
        money: state.money,
        seed: state.seed,
        selectedTile: state.selectedTile,
        overlayVisible: state.overlayVisible
      })
    }
  )
);

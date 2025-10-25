import { useGameStore } from "../state/store";
import { TILES } from "../data/tiles";
import classNames from "classnames";

export function Toolbar(): JSX.Element {
  const selectedTile = useGameStore((state) => state.selectedTile);
  const selectTile = useGameStore((state) => state.selectTile);

  return (
    <div className="flex flex-wrap gap-2">
      {Object.values(TILES).map((tile) => (
        <button
          key={tile.id}
          type="button"
          onClick={() => selectTile(tile.id)}
          className={classNames(
            "rounded-md px-3 py-1.5 text-sm font-medium transition",
            "bg-slate-800 text-slate-200 hover:bg-slate-700",
            selectedTile === tile.id && "ring-2 ring-energy-supply"
          )}
        >
          {tile.name}
        </button>
      ))}
    </div>
  );
}

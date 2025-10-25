import { useGameStore } from "../state/store";

export function OverlayToggle(): JSX.Element {
  const overlayVisible = useGameStore((state) => state.overlayVisible);
  const toggleOverlay = useGameStore((state) => state.toggleOverlay);

  return (
    <button
      type="button"
      onClick={toggleOverlay}
      className="pointer-events-auto rounded-md bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/10 hover:bg-slate-800/80"
    >
      {overlayVisible ? "Hide Grid" : "Show Grid"}
    </button>
  );
}

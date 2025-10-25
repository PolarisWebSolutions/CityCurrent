import { MapView } from "../map/MapView";
import { HUD } from "./HUD";
import { Toolbar } from "./Toolbar";
import { OverlayToggle } from "./OverlayToggle";

export function SimulationPanel(): JSX.Element {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-slate-900/80 shadow-2xl ring-1 ring-white/10">
      <div className="absolute inset-0 flex">
        <MapView />
      </div>
      <div className="pointer-events-none relative flex h-[28rem] flex-col justify-between">
        <div className="flex flex-wrap items-start justify-between gap-3 p-4">
          <div className="pointer-events-auto max-w-xs rounded-lg bg-slate-900/80 px-4 py-3 text-sm leading-relaxed text-slate-200 shadow-lg ring-1 ring-white/10">
            <p className="font-semibold text-slate-100">Interactive grid</p>
            <p>Select an energy asset and click on the map to simulate its impact in real-time.</p>
          </div>
          <OverlayToggle />
        </div>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="pointer-events-auto w-full max-w-sm">
            <HUD />
          </div>
          <div className="pointer-events-auto rounded-lg bg-slate-900/80 p-4 shadow-lg ring-1 ring-white/10">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Build your mix</h3>
            <Toolbar />
          </div>
        </div>
      </div>
    </div>
  );
}

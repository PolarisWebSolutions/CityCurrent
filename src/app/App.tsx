import { MapView } from "../map/MapView";
import { HUD } from "../ui/HUD";
import { Toolbar } from "../ui/Toolbar";
import { OverlayToggle } from "../ui/OverlayToggle";
import { useSimulationLoop } from "../engine/sim";

export default function App(): JSX.Element {
  useSimulationLoop();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <header className="flex items-center justify-between bg-slate-900/80 px-4 py-3 backdrop-blur">
        <h1 className="text-lg font-semibold tracking-wide">CityCurrent</h1>
        <Toolbar />
      </header>
      <main className="relative flex flex-1 overflow-hidden">
        <MapView />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
          <div className="ml-auto w-full max-w-sm">
            <HUD />
          </div>
          <div className="flex items-end justify-end">
            <OverlayToggle />
          </div>
        </div>
      </main>
    </div>
  );
}

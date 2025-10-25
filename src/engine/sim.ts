import { useEffect } from "react";
import { useGameStore } from "../state/store";

const TICK_MS = 200;

export function useSimulationLoop(): void {
  const tick = useGameStore((state) => state.tick);

  useEffect(() => {
    const handle = window.setInterval(() => {
      tick();
    }, TICK_MS);

    return () => window.clearInterval(handle);
  }, [tick]);
}

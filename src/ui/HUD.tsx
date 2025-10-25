import { useGameStore } from "../state/store";

export function HUD(): JSX.Element {
  const { money, incomePerMin, supply, demand, stored, storageCap, pollution, happiness, timeOfDay } =
    useGameStore((state) => ({
      money: state.money,
      incomePerMin: state.incomePerMin,
      supply: state.supply,
      demand: state.demand,
      stored: state.stored,
      storageCap: state.storageCap,
      pollution: state.pollution,
      happiness: state.happiness,
      timeOfDay: state.timeOfDay
    }));

  return (
    <div className="pointer-events-auto rounded-lg bg-slate-900/80 p-4 shadow-lg ring-1 ring-white/10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">City Overview</h2>
      <dl className="space-y-1 text-sm">
        <InfoRow label="Money" value={`$${money.toLocaleString()}`} />
        <InfoRow label="Income/min" value={`${incomePerMin.toFixed(1)}$`} />
        <InfoRow label="Supply" value={`${supply.toFixed(1)} MW`} />
        <InfoRow label="Demand" value={`${demand.toFixed(1)} MW`} />
        <InfoRow label="Storage" value={`${stored.toFixed(1)} / ${storageCap.toFixed(1)} MWh`} />
        <InfoRow label="Pollution" value={`${(pollution * 100).toFixed(0)}%`} />
        <InfoRow label="Happiness" value={`${(happiness * 100).toFixed(0)}%`} />
        <InfoRow label="Time" value={`${timeOfDay.toFixed(2)} h`} />
      </dl>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps): JSX.Element {
  return (
    <div className="flex justify-between text-slate-200">
      <dt className="font-medium text-slate-400">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

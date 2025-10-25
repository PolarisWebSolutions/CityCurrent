export type TileId =
  | "PowerLine"
  | "Substation"
  | "House"
  | "Factory"
  | "Park"
  | "CoalPlant"
  | "WindTurbine"
  | "SolarFarm"
  | "Battery";

export interface TileDefinition {
  id: TileId;
  name: string;
  cost: number;
  upkeep: number;
  supply: number;
  demand: number;
}

export const TILES: Record<TileId, TileDefinition> = {
  PowerLine: { id: "PowerLine", name: "Power Line", cost: 50, upkeep: 1, supply: 0, demand: 0 },
  Substation: { id: "Substation", name: "Substation", cost: 500, upkeep: 5, supply: 0, demand: 0 },
  House: { id: "House", name: "House", cost: 200, upkeep: 0, supply: 0, demand: 5 },
  Factory: { id: "Factory", name: "Factory", cost: 1500, upkeep: 20, supply: 0, demand: 25 },
  Park: { id: "Park", name: "Park", cost: 300, upkeep: 2, supply: 0, demand: 0 },
  CoalPlant: { id: "CoalPlant", name: "Coal Plant", cost: 3000, upkeep: 40, supply: 80, demand: 0 },
  WindTurbine: { id: "WindTurbine", name: "Wind Turbine", cost: 1200, upkeep: 5, supply: 15, demand: 0 },
  SolarFarm: { id: "SolarFarm", name: "Solar Farm", cost: 1800, upkeep: 7, supply: 20, demand: 0 },
  Battery: { id: "Battery", name: "Battery", cost: 1000, upkeep: 3, supply: 0, demand: 0 }
};

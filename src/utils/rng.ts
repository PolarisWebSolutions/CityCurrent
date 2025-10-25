import seedrandom from "seedrandom";

export function createRng(seed: string): () => number {
  const rng = seedrandom(seed);
  return () => rng();
}

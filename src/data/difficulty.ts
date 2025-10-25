import { Difficulty } from "../utils/types";

export interface DifficultySettings {
  id: Difficulty;
  label: string;
  modifier: number;
}

export const DIFFICULTIES: DifficultySettings[] = [
  { id: "easy", label: "Easy", modifier: 0.75 },
  { id: "standard", label: "Standard", modifier: 1 },
  { id: "hard", label: "Hard", modifier: 1.25 }
];

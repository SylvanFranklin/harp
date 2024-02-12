import type { Player } from "./player";

export type AttackFunction = () => void;

export interface Agent {
    name: string;
    cost: number;
    attack: number;
    health: number;
    defense: number;
    icon: string;
    attackFunction(this: Agent, self: Player, opponent: Player, col: number): void;
    defenseFunction(this: Agent, damage: number, oppenent: Agent): void;
}


export enum GamePhase {
    Upkeep = 0, RedMain = 1, BlueMain = 2, Attack = 3, End = 4
}

export const Phases = [
    "Upkeep", "Red Main", "Blue Main", "Attack", "End"
]

export interface Square {
    contents: Agent | null;
    playable: boolean;
}

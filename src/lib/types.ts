export interface Agent {
    name: string;
    cost: number;
    attack: number;
    health: number;
    defense: number;
    icon: string;
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

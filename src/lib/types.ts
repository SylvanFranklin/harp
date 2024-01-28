export interface Agent {
    name: string;
    cost: number;
    attack: number;
    health: number;
    defense: number;
    icon: string;
}


export interface Square {
    contents: Agent | null;
}

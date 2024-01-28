import type { Agent } from '$lib/types';

export class Player {
    name: string;
    deck: Array<Agent>;

    consturctor(name: string, deck: Array<Agent>) {
        this.name = name;
        this.deck = deck;
    }
}



import type { Agent, Square } from '$lib/types';
import { MyBad, Angry, Sad, Gun, Questioning, Dunk, Sick, Cactus, Squid, Suds } from '$lib/agents';

export class Player {
    name: string;
    life: number;
    energy: number;
    activeCardIndex: number | null = null;
    deck: Array<Agent>;
    hand: Array<Agent>;
    board: Array<Square>;

    constructor(name: string) {
        this.name = name;
        this.life = 20;
        this.energy = 10;
        this.deck = this.newDeck();

        // initialize board by looping through ten times
        let board: Array<Square> = [];
        for (let i = 0; i < 10; i++) {
            board.push({ contents: null, playable: false });
        }
        this.board = board;
        this.drawHand();
    }


    private newDeck(): Array<Agent> {
        let frequency = new Map<Agent, number>();
        frequency.set(MyBad, 3);
        frequency.set(Angry, 8);
        frequency.set(Sad, 5);
        frequency.set(Questioning, 4);
        frequency.set(Cactus, 8);
        frequency.set(Dunk, 6);
        frequency.set(Sick, 6);
        frequency.set(Squid, 3);
        frequency.set(Gun, 3);
        frequency.set(Suds, 3);

        let deck: Array<Agent> = [];
        frequency.forEach((value, key) => {
            for (let i = 0; i < value; i++) {
                deck.push(key);
            }
        });

        // shuffle the deck
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }

        return deck;

    }


    drawHand(): Array<Agent> {
        let hand: Array<Agent> = [];
        for (let i = 0; i < 4; i++) {
            if (this.deck.length === 0) {
                this.deck = this.newDeck();
            }
            hand.push(this.deck.pop() as Agent);
        }
        this.hand = hand;
        return hand;
    }

    drawCard(): void {

        if (this.deck.length === 0) {
            this.deck = this.newDeck();
        }
        this.hand.push(this.deck.pop() as Agent);
    }

}



import { type Agent } from './types';

const def: Agent = {
    name: "Default",
    cost: 0,
    attack: 0,
    health: 0,
    defense: 0,
    icon: '🤷',
    attackFunction(self, opponent, col) {

        // calculate the offset. Blue attacking red is -5, while red attacking blue is +5
        let offset = 0;
        if (self.name === "Red") {
            offset = -5;
        } else {
            offset = 5;
        }

        if (opponent.board[col - offset].contents) {
            (opponent.board[col - offset].contents as Agent).defenseFunction(this.attack, this);
        } else {
            opponent.life -= this.attack;
        }

    },

    defenseFunction(this, damage) {
        this.health -= Math.max((damage - this.defense), 0);
    }
}
const pierce: Agent = {
    ...def,
    attackFunction(self, opponent, col) {
        // calculate the offset. Blue attacking red is -5, while red attacking blue is +5
        console.log("Called")
        let offset = 0;
        if (self.name === "Red") {
            offset = -5;
        } else {
            offset = 5;
        }

        if (opponent.board[col - offset].contents) {
            (opponent.board[col - offset].contents as Agent).health -= this.attack;
        }

        opponent.life -= this.attack;
    }
}

const thorns: Agent = {
    ...def,
    defenseFunction(this, damage, opponent) {
        const tempHealth = this.health;
        this.health -= damage;
        opponent.defenseFunction(Math.min(tempHealth, damage), this)
    }

}



const double: Agent = {
    ...def,
    attackFunction(self, opponent, col) {
        // calculate the offset. Blue attacking red is -5, while red attacking blue is +5
        let offset = 0;
        if (self.name === "Red") {
            offset = -5;
        } else {
            offset = 5;
        }

        if (opponent.board[col - offset].contents) {
            (opponent.board[col - offset].contents as Agent).health -= this.attack;
        } else {
            opponent.life -= this.attack;
        }

        // see if the agent was killed
        if (opponent.board[col - offset].contents && (opponent.board[col - offset].contents as Agent).health <= 0) {
            opponent.board[col - offset].contents = null;
        }

        if (opponent.board[col - offset].contents) {
            (opponent.board[col - offset].contents as Agent).health -= this.attack;
        } else {
            opponent.life -= this.attack;

        }
    }

}

export const MyBad: Agent = {
    ...def,
    name: "My bad",
    cost: 1,
    attack: 1,
    health: 1,
    defense: 1,
    icon: '😅',

}
export const Angry: Agent = {
    ...def,
    name: "Angry",
    cost: 2,
    attack: 3,
    health: 2,
    defense: 0,
    icon: '😡'
}
export const Sad: Agent = {
    ...def,
    name: "Sad",
    cost: 3,
    attack: 1,
    health: 4,
    defense: 0,
    icon: '😭'
}
export const Questioning: Agent = {
    ...def,
    name: "Questioning",
    cost: 4,
    attack: 2,
    health: 5,
    defense: 0,
    icon: '🤔'
}

export const Sick: Agent = {
    ...def,
    name: "Sick",
    cost: 5,
    attack: 3,
    health: 6,
    defense: 0,
    icon: '🤢'
}

export const Dunk: Agent = {
    ...def,
    name: "Dunk",
    cost: 6,
    attack: 4,
    health: 7,
    defense: 0,
    icon: '🏀'
}

export const Cactus: Agent = {
    ...thorns,
    name: "Cactus",
    cost: 1,
    attack: 0,
    health: 3,
    defense: 0,
    icon: '🌵'
}

export const Squid: Agent = {
    ...double,
    name: "Squid",
    cost: 8,
    attack: 6,
    health: 9,
    defense: 6,
    icon: '🦑'
}

export const Trash: Agent = {
    ...def,
    name: "Trash",
    cost: 0,
    attack: 0,
    health: 0,
    defense: 0,
    icon: '🗑️'
}
export const Steak: Agent = {
    ...pierce,
    name: "Steak",
    cost: 9,
    attack: 7,
    health: 10,
    defense: 0,
    icon: '🥩'
}
export const Cake: Agent = {
    ...def,
    name: "Cake",
    cost: 10,
    attack: 8,
    health: 11,
    defense: 0,
    icon: '🍰'
}

export const Suds: Agent = {
    ...thorns,
    ...pierce,
    name: "Suds",
    cost: 3,
    attack: 4,
    health: 2,
    defense: 1,
    icon: '😶‍🌫️'
}


export const Gun: Agent = {
    ...pierce,
    name: "Gun",
    cost: 2,
    attack: 3,
    health: 2,
    defense: 0,
    icon: '🔫',
}

export const Ship: Agent = {
    ...def,
    name: "Ship",
    cost: 7,
    attack: 6,
    health: 6,
    defense: 2,
    icon: '🚢'
}



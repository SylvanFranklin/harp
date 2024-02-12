<script lang="ts">
    import { type Agent } from "$lib/types";
    import { Player } from "$lib/player";
    import Bank from "$lib/bank.svelte";
    import Hand from "$lib/hand.svelte";
    import Phaser from "$lib/phaser.svelte";
    import Board from "$lib/board.svelte";

    const Red = new Player("Red");
    const Blue = new Player("Blue");
    let phase: number = 1;
    let turnCount: number = 1;
    let activeLane = -1;
    let lock = false;

    const phaseSetter = async () => {
        if (lock) return;
        lock = true;

        if (phase == 1 || phase == 2) {
            phase++;
        }

        switch (phase) {
            // upkeep
            case 0:
                lock = false;
                if (Red.hand.length < 8) {
                    Red.drawCard();
                    Red.hand = Red.hand;
                }

                if (Blue.hand.length < 8) {
                    Blue.drawCard();
                    Blue.hand = Blue.hand;
                }

                await new Promise((r) => setTimeout(r, 500));
                turnCount++;
                Red.energy = turnCount;
                Blue.energy = turnCount;
                phase++;
                break;
            case 1:
                // play
                break;
            case 2:
                break;
            case 3:
                // fight

                // determine if the board is totally empty, if so reduce the timeout to 200

                for (let i = 0; i < 5; i++) {
                    // red
                    activeLane = i;
                    let timeout = 700;

                    if (Red.board[i].contents && Blue.board[i + 5].contents) {
                        timeout = 200;
                    }

                    // await a timeout to allow the animation to play
                    await new Promise((r) => setTimeout(r, timeout));

                    if (Red.board[i].contents) {
                        (Red.board[i].contents as Agent).attackFunction(
                            Red,
                            Blue,
                            i,
                        );
                    }

                    if (Blue.board[i + 5].contents) {
                        (Blue.board[i + 5].contents as Agent).attackFunction(
                            Blue,
                            Red,
                            i + 5,
                        );
                    }

                    if (Red.board[i].contents) {
                        if ((Red.board[i].contents as Agent).health <= 0) {
                            Red.board[i].contents = null;
                        } else {
                            Red.board[i] = Red.board[i];
                        }
                    }

                    if (Blue.board[i + 5].contents) {
                        if ((Blue.board[i + 5].contents as Agent).health <= 0) {
                            Blue.board[i + 5].contents = null;
                        } else {
                            Blue.board[i + 5] = Blue.board[i + 5];
                        }
                    }
                    Red.life = Red.life;
                    Blue.life = Blue.life;
                }

                activeLane = -1;
                // go through agents and recalculate health

                // rerender players to update health

                // end
                phase++;
                lock = false;
                phaseSetter();
                break;
            case 4:
                await new Promise((r) => setTimeout(r, 500));
                phase = 0;
                lock = false;
                phaseSetter();
                break;
        }

        lock = false;
    };

    function makePlayable(player: Player, on: boolean) {
        if (player.name == "Red") {
            for (let i = 0; i < 5; i++) {
                if (Red.board[i].contents == null) {
                    Red.board[i].playable = on;
                } else {
                    Red.board[i].playable = false;
                }
            }
        } else {
            for (let i = 9; i > 4; i--) {
                if (Blue.board[i].contents == null) {
                    Blue.board[i].playable = on;
                } else {
                    Blue.board[i].playable = false;
                }
            }
        }
    }

    function playCard(player: Player, index: number) {
        if (player.name == "Red") {
            if (
                Red.board[index].playable &&
                Red.activeCardIndex !== null &&
                Red.hand[Red.activeCardIndex].cost <= Red.energy
            ) {
                Red.board[index].contents = {
                    ...Red.hand[Red.activeCardIndex],
                } as Agent;
                Red.energy -= Red.hand[Red.activeCardIndex].cost;
                Red.hand.splice(Red.activeCardIndex, 1);

                Red.activeCardIndex = null;
                makePlayable(player, false);
                // Red.drawCard();
            }
        } else {
            if (
                Blue.board[index].playable &&
                Blue.activeCardIndex !== null &&
                Blue.hand[Blue.activeCardIndex].cost <= Blue.energy
            ) {
                Blue.board[index].contents = {
                    ...Blue.hand[Blue.activeCardIndex],
                } as Agent;
                Blue.energy -= Blue.hand[Blue.activeCardIndex].cost;
                Blue.hand.splice(Blue.activeCardIndex, 1);
                Blue.activeCardIndex = null;
                makePlayable(player, false);
                // Blue.drawCard();
            }
        }
        console.log(player.board);
    }
</script>

<main class="w-screen h-screen py-20">
    <span class="absolute left-14 top-80">
        <Phaser {phase} {phaseSetter} />
    </span>
    <div class="w-full flex flex-col items-center">
        <Hand player={Red} {makePlayable} active={() => phase == 2} />
        <Bank player={Red} active={() => phase == 2} />
        <div class="grid grid-cols-5 grid-flow-row grid-rows-5 gap-2 w-fit">
            <Board player={Red} {playCard} {activeLane} />
            {#each Array(5).fill( { contents: null, playable: false }, ) as square, index}
                <span
                    class={`${
                        activeLane == index && "brightness-125"
                    } rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm border-0`}
                >
                </span>
            {/each}
            <Board player={Blue} {playCard} {activeLane} />
        </div>

        <Bank player={Blue} active={() => phase == 1} />
        <Hand player={Blue} {makePlayable} active={() => phase == 1} />
    </div>
</main>

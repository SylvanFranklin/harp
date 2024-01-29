<script lang="ts">
    import { GamePhase, type Agent } from "$lib/types";
    import { Player } from "$lib/player";
    import Bank from "$lib/bank.svelte";
    import Hand from "$lib/hand.svelte";
    import { onMount } from "svelte";
    import Phaser from "$lib/phaser.svelte";

    const Red = new Player("Red");
    const Blue = new Player("Blue");

    let phase: number = 1;
    let turnCount: number = 1;

    const phaseSetter = () => {
        if (phase > 3) {
            phase = 0;
        } else {
            phase++;
        }

        switch (phase) {
            // upkeep
            case 0:
                Red.drawCard();
                Red.hand = Red.hand;
                Blue.drawCard();
                Blue.hand = Blue.hand;
                turnCount++;
                Red.energy = turnCount;
                Blue.energy = turnCount;
                break;
            case 1:
                // play
                break;
            case 2:
                break;
            case 3:
                // fight
                for (let i = 0; i < 5; i++) {
                    console.log(Red.board[i].contents);
                    if (Red.board[i].contents != null) {
                        console.log(Blue.board[i].contents);
                        if (Blue.board[i % 5].contents != null) {
                            (Red.board[i].contents as Agent).health -= (
                                Blue.board[i % 5].contents as Agent
                            ).attack;
                            (Blue.board[i % 5].contents as Agent).health -= (
                                Red.board[i].contents as Agent
                            ).attack;
                        } else {
                            Blue.life -= (
                                Red.board[i].contents as Agent
                            ).attack;
                        }
                    } else if (Blue.board[i % 5].contents != null) {
                        Red.life -= (
                            Blue.board[i % 5].contents as Agent
                        ).attack;
                    }
                }

                // end
                break;
        }
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
                Red.board[index].contents = Red.hand[Red.activeCardIndex];
                // subtract the enegery, using the card in the hand, rather than the card on the board
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
                Blue.board[index].contents = Blue.hand[Blue.activeCardIndex];
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

<main class="w-screen h-screen bg-slate-600 pt-10">
    <span class="absolute left-14 top-40">
        <Phaser {phase} {phaseSetter} />
    </span>
    <div class="w-full flex flex-col items-center">
        <Hand player={Red} {makePlayable} />
        <Bank player={Red} active={() => phase == 2} />
        <div class="grid grid-cols-5 grid-flow-row grid-rows-5 gap-2 w-fit">
            {#each Red.board as square, index}
                <button
                    class={`rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm border-red-200/40 overflow-clip 
                    ${index < 5 ? "border-4" : "border-0"}
                    ${square.playable && "border-yellow-400"}
                `}
                    on:click={() => playCard(Red, index)}
                >
                    {#if square.contents}
                        <div class="border-4 m-2 pt-2 bg-white rounded-lg">
                            <span class="text-5xl">
                                {square.contents.icon}
                            </span>
                            <div class="flex flex-row-reverse -mb-1 -mr-1">
                                <p
                                    class="text-white font-bold rounded-t-sm bg-red-400 w-6 h-6 flex items-center justify-center"
                                >
                                    {square.contents.health}
                                </p>
                                <p
                                    class="text-white font-bold rounded-t-sm bg-black w-6 h-6 flex items-center justify-center"
                                >
                                    {square.contents.attack}
                                </p>
                            </div>
                        </div>
                    {/if}
                </button>
            {/each}
            <!---->
            {#each Array(5).fill({ contents: null, playable: false }) as square}
                <span
                    class="rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm border-0"
                >
                </span>
            {/each}

            {#each Blue.board as square, index}
                <button
                    class={`rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm border-blue-200/40 overflow-clip 
                    ${index >= 5 ? "border-4" : "border-0"}
                    ${square.playable && "border-yellow-400"}
                `}
                    on:click={() => playCard(Blue, index)}
                >
                    {#if square.contents}
                        <div class="border-4 m-2 pt-2 bg-white rounded-lg">
                            <span class="text-5xl">
                                {square.contents.icon}
                            </span>
                            <div class="flex flex-row-reverse -mb-1 -mr-1">
                                <p
                                    class="text-white font-bold rounded-t-sm bg-red-400 w-6 h-6 flex items-center justify-center"
                                >
                                    {square.contents.health}
                                </p>
                                <p
                                    class="text-white font-bold rounded-t-sm bg-black w-6 h-6 flex items-center justify-center"
                                >
                                    {square.contents.attack}
                                </p>
                            </div>
                        </div>
                    {/if}
                </button>
            {/each}
        </div>

        <Bank player={Blue} active={() => phase == 1} />
        <Hand player={Blue} {makePlayable} />
    </div>
</main>

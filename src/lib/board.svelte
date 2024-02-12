<script lang="ts">
    import { fly } from "svelte/transition";
    import type { Player } from "./player";
    import type { Square } from "./types";
    import { backIn, backInOut, backOut } from "svelte/easing";

    export let player: Player;
    export let playCard: (player: Player, index: number) => void;
    export let activeLane: number;

    function swing(node: HTMLElement, { attack }: { attack: number }) {
        let duration = 1000;

        if (attack == 0) {
            duration = 0;
        }

        return {
            duration: duration,
            css: (t: number) => {
                const top_val = player.name == "Red" ? 390 : -390;
                const customEase = (t: number) => {
                    return -1 * (2.5 * (t - 0.5) ** 2 - 1.3);
                };

                return `
                    position: relative; 
                    top: ${customEase(t) * top_val}px;
                    z-index: 1;
                `;
            },
        };
    }

    const borderStyle = (index: number, square: Square): string => {
        if (square.playable) {
            return "border-4 border-yellow-400";
        }

        if (player.name == "Red") {
            if (index < 5) {
                return "border-4 border-red-400/40";
            } else {
                return "border-0";
            }
        } else {
            if (index < 5) {
                return "border-0";
            } else {
                return "border-4 border-blue-400/40";
            }
        }
    };

    const visited = [false, false, false, false, false];

    $: {
        if (activeLane != -1) {
            visited[activeLane % 5] = !visited[activeLane % 5];
        }
    }
</script>

{#each player.board as square, index}
    <button
        class={`rounded-md bg-slate-500 shadow-sm aspect-square flex items-center justify-center p-2 z-0
        ${activeLane == index % 5 && "brightness-125"}

        ${borderStyle(index, square)}`}
        on:click={() => {
            playCard(player, index);
        }}
    >
        {#if square.contents}
            {#key visited[index % 5]}
                <button
                    class="pt-2 rounded-lg w-full h-full bg-gray-400 relative flex flex-col items-center justify-center"
                    in:swing={{ attack: square.contents.attack }}
                    id="fixanimation"
                >
                    <span class="text-5xl">
                        {square.contents.icon}
                    </span>
                    <div
                        class="flex flex-row mt-auto border-none w-full justify-center -mb-1"
                    >
                        <p
                            class="text-white font-bold rounded-l-md bg-black w-8 h-6 flex items-center justify-center"
                        >
                            {square.contents.attack}
                        </p>
                        <p
                            class={`text-white font-bold rounded-r-md  w-8 h-6 flex items-center justify-center ${
                                square.contents.defense > 0
                                    ? "bg-gray-400 text-gray-800 brightness-110"
                                    : "bg-red-400"
                            }`}
                        >
                            {square.contents.health}
                        </p>
                    </div>
                </button>
            {/key}
        {/if}
    </button>
{/each}

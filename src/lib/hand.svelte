<script lang="ts">
    import { Player } from "$lib/player";
    import { flip } from "svelte/animate";
    export let player: Player;
    export let makePlayable: Function;

    const select = (index: number) => {
        if (player.activeCardIndex === index) {
            player.activeCardIndex = null;
            makePlayable(player, false);
        } else {
            // check if card cost is less than energy
            if (player.hand[index].cost > player.energy) {
                return;
            } else {
                // if so, set active card index to index
                player.activeCardIndex = index;
                makePlayable(player, true);
            }

        }
    };
</script>

<ol class="grid grid-flow-col gap-4 mx-auto">
    {#each player.hand as card, index}
        <button
            class={`w-28 h-32 bg-slate-500 flex flex-col rounded-lg ${
                player.activeCardIndex === index && "border-4 border-yellow-400"
            } ${card.cost > player.energy && "opacity-50"}`}
            on:click={() => select(index)}
        >
            <h2
                class="text-yellow-400 absolute text-lg font-bold bg-black p-1 rounded-full -ml-2 -mt-3 w-8 h-8 flex items-center justify-center"
            >
                {card.cost}
            </h2>
            <h1
                class="w-full text-center text-sm bg-black text-white p-2 rounded-t-lg"
            >
                {card.name}
            </h1>

            <h3 class="text-5xl mt-2">
                {card.icon}
            </h3>
            <div class="flex flex-row-reverse mt-auto rounded-br-lg">
                <p
                    class="text-white font-bold rounded-t-sm bg-red-400 w-6 h-6 flex items-center justify-center rounded-br-lg"
                >
                    {card.health}
                </p>
                <p
                    class="text-white font-bold rounded-t-sm bg-black w-6 h-6 flex items-center justify-center"
                >
                    {card.attack}
                </p>
            </div>
        </button>
    {/each}
</ol>

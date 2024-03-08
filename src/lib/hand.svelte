<script lang="ts">
    import { Player } from "$lib/player";
    import Card from "./card.svelte";
    export let player: Player;
    export let makePlayable: Function;
    export let active: () => boolean;

    const select = (index: number) => {
        if (active()) {
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
        }
    };
</script>

<ol
    class={`grid grid-flow-col gap-4 mx-auto ${
        player.hand.length > 4 && "grid-rows-2"
    }`}
>
    {#each player.hand as card, index}
        <button
            class={`w-28 h-32 bg-slate-500 flex flex-col rounded-lg ${
                player.activeCardIndex === index && "border-4 border-yellow-400"
            } ${card.cost > player.energy && "opacity-50"}`}
            on:click={() => select(index)}
        >
            <Card {card}/>
        </button>
    {/each}
</ol>

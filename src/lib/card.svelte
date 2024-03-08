<script lang="ts">
    import type { Agent } from "./types";
    export let card: Agent;
</script>

<div class="w-full h-full flex flex-col">
    <h2
        class="text-yellow-400 absolute text-lg font-bold bg-black p-1 rounded-full -ml-2 -mt-3 w-8 h-8 flex items-center justify-center"
    >
        {card.cost}
    </h2>
    <h1 class="w-full text-center text-sm bg-black text-white p-2 rounded-t-lg">
        {card.name}
    </h1>

    <h3 class="text-5xl mt-2">
        {card.icon}
    </h3>

    <div class="flex flex-row mt-auto border-none w-full justify-center -mb-1">
        <p
            class="text-white font-bold rounded-l-md bg-black w-8 h-6 flex items-center justify-center"
        >
            {card.attack}
        </p>
        <p
            class={`text-white font-bold rounded-r-md  w-8 h-6 flex items-center justify-center ${
                card.defense > 0
                    ? "bg-gray-400 text-gray-800 brightness-110"
                    : "bg-red-400"
            }`}
        >
            {card.health}
        </p>
    </div>
</div>

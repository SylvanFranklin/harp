<script lang="ts">
    import type { Square } from "$lib/types";

    // five rows of empy squares
    const RedBoard: Square[] = Array(10).fill({ contents: null });
    const BlueBoard: Square[] = Array(10).fill({ contents: null });
</script>

<main class="flex w-screen h-screen bg-slate-600 justify-center pt-10">
    <div class="grid grid-cols-5 grid-flow-row grid-rows-7 gap-2 h-min">
        {#each RedBoard as square, index}
            <button
                class={`rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm border-red-200/40
                    ${index < 5 ? "border-4" : "border-0"}
                `}
                on:click={() => {}}
            >
                {#if square.contents}
                    <span>
                        {square.contents.icon}
                    </span>
                {/if}
            </button>
        {/each}
        <!---->
        {#each Array(5).fill({ contents: null }) as square}
            <span
                class="rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm border-0"
            >
            </span>
        {/each}

        {#each BlueBoard as square, index}
            <span
                class={`rounded-md bg-slate-500 w-28 h-28 aspect-square shadow-sm ${
                    index >= 5 ? "border-4" : "border-0"
                } border-blue-200/20`}
            ></span>
        {/each}
    </div>
</main>

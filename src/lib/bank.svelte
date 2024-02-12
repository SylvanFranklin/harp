<script lang="ts">
    import { Player } from "$lib/player";
    import { backOut } from "svelte/easing";
    import { scale } from "svelte/transition";
    export let player: Player;
    export let active: () => boolean;
</script>

<div class="flex items-center justify-center flex-row">
    <div>
        <h3 class="text-center text-lg text-white font-bold">
            {player.life}
        </h3>
        {#key player.life}
            <svg
                in:scale={{
                    duration: 500,
                    delay: 200,
                    easing: backOut,
                    start: 0.2,
                }}
                xmlns="http://www.w3.org/2000/svg"
                class="text-red-400 w-14 h-14"
                viewBox="0 0 24 24"
                ><path
                    fill="currentColor"
                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412q-.975 1.313-2.625 2.963T13.45 19.7z"
                />
            </svg>
        {/key}
    </div>
    <span
        class={`${
            active()
                ? player.name == "Red"
                    ? "text-red-400 border-0"
                    : "text-blue-500 border-0"
                : "text-black"
        }}`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-32 h-32"
            ><path
                fill="currentColor"
                d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
            /></svg
        >
    </span>
    <div>
        <h3 class={`text-center text-lg text-white font-bold`}>
            {player.energy}
        </h3>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-yellow-400 w-14 h-14"
            viewBox="0 0 24 24"
            ><path
                fill="currentColor"
                d="M11.975 22.9q-.275 0-.55-.112q-.275-.113-.5-.338l-9.375-9.4q-.225-.225-.325-.5t-.1-.55q0-.275.1-.55t.325-.5l9.375-9.4q.225-.225.5-.338q.275-.112.55-.112t.563.112q.287.113.512.338l9.4 9.4q.225.225.325.5t.1.55q0 .275-.1.55t-.325.5l-9.4 9.4q-.225.225-.512.338q-.288.112-.563.112ZM12 18l1.85-4.15L18 12l-4.15-1.85L12 6l-1.85 4.15L6 12l4.15 1.825Z"
            /></svg
        >
    </div>
</div>

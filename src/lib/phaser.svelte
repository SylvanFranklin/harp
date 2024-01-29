<script lang="ts">
    export let phase: number;
    export let phaseSetter: Function;
</script>

<section
    class="w-32 border-8 border-white rounded-lg grid grid-cols-1 grid-row-5 bg-white"
>
    <span
        class={`w-full flex items-center justify-center text-white flex-col gap-y-2 text-center text-md font-mono p-2 bg-blue-900 rounded-t-lg ${
            phase === 4 && "scale-105 rounded-md brightness-110"
        }`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-white w-12 h-12"
            viewBox="0 0 24 24"
            ><path
                fill="currentColor"
                d="M13.1 23q-2.1 0-3.937-.8t-3.2-2.162Q4.6 18.675 3.8 16.838T3 12.9q0-3.2 1.8-5.8t4.825-3.65q.55-.2 1.025.137t.45.913q-.075 2.125.675 4.05t2.25 3.425q1.5 1.5 3.425 2.25t4.05.675q.65-.025.963.438t.112 1.037q-1.1 3-3.687 4.813T13.1 23m0-2q2.2 0 4.075-1.1t2.95-3.025q-2.15-.2-4.075-1.088t-3.45-2.412q-1.525-1.525-2.425-3.45T9.1 5.85Q7.175 6.925 6.088 8.813T5 12.9q0 3.375 2.363 5.738T13.1 21m-.5-7.625"
            /></svg
        >
        end
    </span>
    <span
        class={`w-full flex items-center justify-center text-white flex-col gap-y-2 text-center text-md font-mono p-2 bg-gray-800 ${
            phase === 3 && "scale-105 rounded-md brightness-110"
        }`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-white w-12 h-12"
            viewBox="0 0 24 24"
            ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6m-3 3l4 4m-1 1l2-2M14.5 6.5L18 3h3v3l-3.5 3.5M5 14l4 4m-2-1l-3 3m-1-1l2 2"
            /></svg
        >
        fight
    </span>

    <span
        class={`w-full flex items-center justify-center text-white flex-col gap-y-2 text-center text-md font-mono p-2 bg-red-400 ${
            phase === 2 && "scale-105 rounded-md brightness-110"
        }`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-white"
            viewBox="0 0 14 14"
            ><path
                fill="currentColor"
                fill-rule="evenodd"
                d="M7.56.33a.48.48 0 0 0-.587.339L4.64 9.377a.48.48 0 0 0 .34.587l6.083 1.63a.48.48 0 0 0 .587-.34l2.335-8.707a.48.48 0 0 0-.34-.588L7.561.33ZM3.433 9.053l1.596-5.955L.356 4.349a.48.48 0 0 0-.34.588l2.335 8.707a.48.48 0 0 0 .587.34l6.084-1.63a.452.452 0 0 0 .023-.007l-4.39-1.175a1.73 1.73 0 0 1-1.223-2.12Z"
                clip-rule="evenodd"
            /></svg
        >
        red play
    </span>

    <span
        class={`w-full flex items-center justify-center text-white flex-col gap-y-2 text-center text-md font-mono p-2 bg-blue-500 ${
            phase === 1 && "scale-105 rounded-md brightness-110"
        }`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-white"
            viewBox="0 0 14 14"
            ><path
                fill="currentColor"
                fill-rule="evenodd"
                d="M7.56.33a.48.48 0 0 0-.587.339L4.64 9.377a.48.48 0 0 0 .34.587l6.083 1.63a.48.48 0 0 0 .587-.34l2.335-8.707a.48.48 0 0 0-.34-.588L7.561.33ZM3.433 9.053l1.596-5.955L.356 4.349a.48.48 0 0 0-.34.588l2.335 8.707a.48.48 0 0 0 .587.34l6.084-1.63a.452.452 0 0 0 .023-.007l-4.39-1.175a1.73 1.73 0 0 1-1.223-2.12Z"
                clip-rule="evenodd"
            /></svg
        >
        blue play
    </span>
    <span
        class={`w-full flex items-center justify-center text-white flex-col gap-y-2 text-center text-md font-mono rounded-b-lg p-2 bg-yellow-400 ${
            phase === 0 && "scale-105 rounded-md brightness-110"
        }`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-white w-12 h-12"
            viewBox="0 0 56 56"
            ><path
                fill="currentColor"
                d="M28.01 24.222c.962 0 1.77-.874 1.77-1.945v-8.171l-.262-3.3l1.617 1.858l2.732 2.753c.327.306.742.502 1.18.502c.873 0 1.485-.59 1.485-1.464c0-.459-.153-.808-.524-1.158L29.19 6.961c-.46-.415-.787-.568-1.18-.568c-.415 0-.721.153-1.18.568l-6.817 6.336c-.371.35-.524.7-.524 1.158c0 .874.611 1.464 1.485 1.464c.415 0 .852-.197 1.158-.502l2.95-2.972l1.398-1.639l-.262 3.3v8.171c0 1.07.83 1.945 1.792 1.945m11.253 5.986c.7.678 1.858.678 2.666-.109l3.801-3.802c.809-.808.787-1.944.088-2.621c-.655-.7-1.813-.721-2.622.087l-3.802 3.802c-.786.808-.808 1.988-.13 2.643m-25.17-.109c.808.787 1.966.809 2.644.11c.677-.678.677-1.836-.131-2.644l-3.802-3.802c-.809-.808-1.923-.765-2.622-.087c-.7.655-.7 1.813.109 2.622ZM1.9 51.992h52.198c1.049 0 1.901-.786 1.901-1.77c0-.96-.852-1.747-1.9-1.747H37.471c1.485-1.967 2.381-4.392 2.381-7.014c0-6.467-5.375-11.864-11.842-11.864c-6.468 0-11.842 5.397-11.842 11.864c0 2.622.895 5.047 2.36 7.014H1.9c-1.026 0-1.9.785-1.9 1.748c0 .983.874 1.77 1.9 1.77m2.84-9.286h5.375c1.136 0 1.989-.808 1.967-1.77c-.022-.983-.83-1.791-1.967-1.791H4.741c-1.136 0-1.944.808-1.944 1.792c0 .961.808 1.77 1.944 1.77m41.164 0h5.376c1.114 0 1.944-.808 1.944-1.77c0-.983-.83-1.791-1.944-1.791h-5.376c-1.136 0-1.988.808-1.966 1.792c.022.961.83 1.77 1.966 1.77"
            /></svg
        >
        begin
    </span>
</section>

<section
    class="w-32 border-8 border-white rounded-lg grid grid-cols-1 grid-row-5 bg-white mt-4"
>
    <button
        on:click={() => phaseSetter()}
        class={`w-full flex items-center justify-center text-white flex-col gap-y-2 text-center text-md font-mono rounded-lg p-2 bg-purple-400 hover:scale-105 duration-200`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-white w-12 h-12"
            viewBox="0 0 24 24"
            ><path
                fill="currentColor"
                d="M16.5 17V7q0-.425.288-.712T17.5 6q.425 0 .713.288T18.5 7v10q0 .425-.288.713T17.5 18q-.425 0-.712-.288T16.5 17m-11-.875v-8.25q0-.45.3-.725t.7-.275q.125 0 .275.025t.275.125l6.2 4.15q.225.15.338.363T13.7 12q0 .25-.112.463t-.338.362l-6.2 4.15q-.125.1-.275.125t-.275.025q-.4 0-.7-.275t-.3-.725"
            /></svg
        >
        next
    </button>
</section>

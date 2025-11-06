<script lang="ts">
    import { Menu, X } from "@lucide/svelte";
    import { Button, NavButton } from "$components/ui";

    let { children, open = $bindable() } = $props();
</script>

<section class="container">
    <Button
        aria-expanded={open}
        onclick={() => open = !open}
    >
        {#if open}
            <X class="lucide" size={12} strokeWidth={3} />
        {:else}
            <Menu class="lucide" size={12} strokeWidth={3} />
        {/if}
    </Button>
    <ul
        class="dropdown"
        class:open={open}
    >
        {@render children()}
    </ul>
</section>

<style lang="scss">
    @use "$styles/colours.scss";

    .container {
        grid-area: nav;
        display: flex;

        position: relative;

        justify-self: right;
    }

    .dropdown {
        display: flex;
        flex-flow: wrap;
        max-width: 150px;
        height: auto;
        padding: 5px 5px;

        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;

        align-items: center;
        justify-items: center;

        list-style: none;
        gap: 1rem;
        background-color: colours.$bg;
        border: 2px solid colours.$accent;
        border-radius: 10px;

        opacity: 0;
        transform: translateY(0px) translateX(0px);
        transition: opacity 100ms ease, transform 100ms ease;
        pointer-events: none;
        visibility: hidden;

        &.open {
            z-index: 10;

            opacity: 1;
            transform: translateY(10px) translateX(20px);
            transition: opacity 100ms ease, transform 100ms ease;
            pointer-events: auto;
            visibility: visible;
        }

    }
</style>
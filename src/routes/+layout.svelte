<!-- @component
  --
  -->

<script lang="ts">
    import { NavBar, InfoBar } from "$components";
    import "../app.scss";

    let { children } = $props();
</script>

<div class="container">
    <NavBar />
    <main>
        {@render children()}
    </main>
    <InfoBar />
</div>

<style lang="scss">
    @use "$styles/colours.scss";

    .container {
        display: grid;
        grid-template-rows: 30px 1fr 30px;
        grid-template-areas:
            "toolbar"
            "main"
            "infobar";
        box-sizing: border-box;
        gap: 2px;

        overflow: hidden;

        height: 100%;
        width: 100%;
        border-radius: 10px;

        font-size: 1.2rem;
    }

    main {
        grid-area: main;
        display: flex;
        overflow: auto;

        width: 100%;
        height: 100%;

        align-self: stretch;
        justify-self: stretch;

        background-color: colours.$bg;
    }
</style>

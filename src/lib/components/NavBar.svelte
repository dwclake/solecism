<script lang="ts">
    import { Button, NavButton, WebGLCanvas } from "$components/ui";
    import { NavMenu } from "$components";

    const links = [
        { page: "Home", href: "/" },
        { page: "About", href: "/about" }
    ];

    let open = $state(false);
    const onclick = () => {
        open = false;
    }
</script>

<section class="container">
    <div class="logo">
        <WebGLCanvas />
    </div>
    <h1 class="title abril-fatface-regular">solecism</h1>
    <NavMenu bind:open={open} >
        {#each links as link, index}
            <NavButton
                href={link.href}
                key={index}
                onclick={onclick}
            >
                {link.page}
            </NavButton>
        {/each}
    </NavMenu>
    <nav class="socials">
        <Button>click me</Button>
    </nav>
</section>

<style lang="scss">
    @use "$styles/colours.scss";

    .container {
        grid-area: toolbar;

        display: grid;
        grid-template-columns: 70px 70px 90px 40px 100px 1fr 70px;
        grid-template-areas: "traffic-lights logo title nav actions social spacer";
        height: 30px;
        width: 100%;

        align-content: center;
        align-items: center;

        background-color: colours.$bg;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 2px 2px 5px colours.$shade;

        app-region: drag;
    }

    .logo {
        grid-area: logo;

        display: flex;
        object-fit: contain;
        height: 30px;
        width: 30px;

        align-items: center;
        justify-self: center;
    }

    .title {
        grid-area: title;
        display: flex;

        font-size: 2rem;
        color: colours.$text;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .socials {
        grid-area: social;
        display: flex;

        position: relative;

        align-items: center;
        justify-self: right;
    }
</style>

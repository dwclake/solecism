<!-- @component
  -- Responsible for rendering a navigation button
  -->

<script lang="ts">
    import { page } from "$app/state";

    const { children, ...props } = $props();
    const active = $derived(props.href === page.url.pathname);
</script>

<li>
    <a class:active aria-label="Navigation Button" {...props}>
        {@render children()}
    </a>
</li>

<style lang="scss">
    @use "$styles/colours.scss";
    @use "$styles/placeholders.scss" as *;

    li {
        display: flex;
        justify-content: center;
    }

    a {
        @extend %button;

        font-size: 1.2rem;
        color: colours.$text;
        text-decoration: none;

        &:hover.active {
            transform: translateY(0.25px) translateX(0.25px);
            background-color: colours.$bad;
            color: colours.$fade;
            border: 2px solid colours.$accent;
            box-shadow: 1px 1px 2px colours.$shade;
        }

        &.active {
            color: colours.$fade;
        }
    }
</style>

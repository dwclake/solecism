<!--

-->

<script lang="ts">
    const { children, active, key, ...props } = $props();
</script>

<li {key}>
    <a
        class:active={active}
        aria-label="Navigation Button"
        {...props}
    >
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
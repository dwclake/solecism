<!-- @component
  -- Responsible for rendering a styled button element
  -->

<script lang="ts">
    const { children, ...props } = $props();
</script>

<button {...props}>{@render children()}</button>

<style lang="scss">
    @use "$styles/colours.scss";
    @use "$styles/placeholders.scss" as *;

    button {
        @extend %button;
    }

    .lucide {
        color: colours.$text;
    }
</style>

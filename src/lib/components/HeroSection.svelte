<script lang="ts">
    import { onMount } from 'svelte';

    let now = '';
    onMount(() => {
        const update = () => (now = new Date().toLocaleTimeString());
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    });

    function pingMain() {
        window.electron.ping().then(res => {
            console.log('ping response:', res);
            alert(`Ping response: ${String(res)}`);
        });
    }
</script>

<section>
    <p>
        Current time: <span class="clock">{now}</span>
    </p>

    <div>
        <button on:click={pingMain}>Ping main process</button>
    </div>
</section>

<style lang="scss">
    button {
        background: #2563eb;
        color: white;
        border: none;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.95rem;
    }

    button:hover {
        background: #1e40af;
    }

    .clock {
        font-weight: 600;
        color: #0b1220;
    }
</style>

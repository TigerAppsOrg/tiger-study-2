<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { Toaster } from "$lib/components/ui/sonner";
    import "@fontsource/lato";
    import "@fontsource/spectral";
    import { onMount } from "svelte";
    import "../app.css";
    let { children } = $props();

    // Refresh the page every REFRESH_INTERVAL_MINUTES
    const REFRESH_INTERVAL_MINUTES = 10;
    onMount(() => {
        setInterval(
            () => {
                invalidateAll();
            },
            REFRESH_INTERVAL_MINUTES * 60 * 1000
        );
    });
</script>

<svelte:head>
    <title>TigerStudy</title>
</svelte:head>

<Toaster />
{@render children()}

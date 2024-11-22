<script lang="ts">
    import "@fontsource/lato";
    import "@fontsource/spectral";
    import "../app.css";
    import { Toaster } from "$lib/components/ui/sonner";
    let { children } = $props();
</script>

<svelte:head>
    <title>TigerStudy</title>
</svelte:head>

<Toaster />
{@render children()}

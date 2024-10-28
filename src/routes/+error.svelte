<!-- 
    @component +error.svelte 

    View that renders when an error occurs.
    Based on the TigerJunction error page.
    - Author: Joshua Lau '26
-->

<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Home } from "svelte-radix";
</script>

<svelte:head>
    <title>TigerStudy | Oh Noes!</title>
    <meta property="og:title" content="TigerStudy | Oh Noes!" />
</svelte:head>

<div class="h-[80vh] std-flex">
    <div class="text-center">
        <h1 class="text-8xl font-semibold text-primary">Oh noes!</h1>
        <h2 class="text-4xl mb-8 text-slate-700 font-light">
            {$page.status}
            {$page.error?.message}
        </h2>
        <Button href="/" size="lg">
            <Home class="mr-2" />
            <span> Go to Homepage </span>
        </Button>
    </div>
</div>

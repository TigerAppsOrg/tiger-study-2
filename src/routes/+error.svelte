<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Icon, Home } from "svelte-hero-icons";
</script>

<svelte:head>
    <title>TigerStudy | Oh Noes!</title>
    <meta property="og:title" content="TigerStudy | Oh Noes!" />
</svelte:head>

<div class="std-flex h-[80vh]">
    <div class="text-center">
        <h1 class="text-8xl font-semibold text-primary">Oh noes!</h1>
        <h2 class="mb-8 text-4xl font-light text-slate-700">
            {$page.status}
            {$page.error?.message}
        </h2>
        <Button href="/" size="lg">
            <Icon src={Home} />
            <span> Go to Homepage </span>
        </Button>
    </div>
</div>
